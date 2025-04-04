const Asset = require('../../models/Asset');
const Usuario = require('../../models/Usuario');  // Para verificar que el usuario que sube un asset existe

// Crear un nuevo asset
const crearAsset = async (req, res) => {
    try {
        console.log("Request body:", req.body);  // Imprimir el cuerpo de la solicitud

        const { 
            titulo, 
            descripcion, 
            autor, 
            imagenPrincipal, 
            galeriaMultimedia, 
            formatos, 
            categorias, 
            usuarioCreador 
        } = req.body;

        // Verificar si los campos obligatorios están presentes
        if (!titulo || !descripcion || !autor || !imagenPrincipal || !usuarioCreador) {
            return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
        }

        // Validar que galeriaMultimedia sea un array de objetos con las propiedades tipo y url
        if (galeriaMultimedia && !Array.isArray(galeriaMultimedia)) {
            return res.status(400).json({ mensaje: "galeriaMultimedia debe ser un array" });
        }

        for (let item of galeriaMultimedia) {
            if (typeof item !== 'object' || !item.tipo || !item.url) {
                return res.status(400).json({ mensaje: "Cada item en galeriaMultimedia debe ser un objeto con propiedades tipo y url" });
            }
        }

        // Validar que formatos sea un array de objetos con tipo, tamaño y url
        if (formatos && !Array.isArray(formatos)) {
            return res.status(400).json({ mensaje: "formatos debe ser un array" });
        }

        for (let item of formatos) {
            if (typeof item !== 'object' || !item.tipo || !item.tamaño || !item.url) {
                return res.status(400).json({ mensaje: "Cada item en formatos debe ser un objeto con propiedades tipo, tamaño y url" });
            }
        }

        // Crear el nuevo asset
        const nuevoAsset = new Asset({
            titulo,
            descripcion,
            autor,
            imagenPrincipal,
            galeriaMultimedia,
            formatos,
            categorias,
            usuarioCreador
        });

        // Guardar el asset en la base de datos
        await nuevoAsset.save();

        return res.status(201).json({ mensaje: "Asset creado con éxito", asset: nuevoAsset });

    } catch (error) {
        console.error("Error al crear el asset:", error);  // Imprimir error para depurar
        return res.status(500).json({ mensaje: "Error al crear asset", error: error.message });
    }
};



// Obtener todos los assets
const obtenerAssets = async (req, res) => {
    try {
        const assets = await Asset.find();
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los assets", error: error.message });
    }
};

// Obtener un asset por su ID
const obtenerAssetPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await Asset.findById(id);

        if (!asset) {
            return res.status(404).json({ mensaje: "Asset no encontrado" });
        }

        res.status(200).json(asset);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el asset", error: error.message });
    }
};

// Actualizar un asset por su ID
const actualizarAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, autor, imagenPrincipal, galeriaMultimedia, formatos, categorias } = req.body;

        // Buscar el asset a actualizar
        const asset = await Asset.findById(id);
        if (!asset) {
            return res.status(404).json({ mensaje: "Asset no encontrado" });
        }

        // Actualizar los campos del asset
        asset.titulo = titulo || asset.titulo;
        asset.descripcion = descripcion || asset.descripcion;
        asset.autor = autor || asset.autor;
        asset.imagenPrincipal = imagenPrincipal || asset.imagenPrincipal;
        asset.galeriaMultimedia = galeriaMultimedia || asset.galeriaMultimedia;
        asset.formatos = formatos || asset.formatos;
        asset.categorias = categorias || asset.categorias;

        // Guardar los cambios
        await asset.save();
        res.status(200).json({ mensaje: "Asset actualizado con éxito", asset });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el asset", error: error.message });
    }
};

// Eliminar un asset por su ID
const eliminarAsset = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar el asset
        const assetEliminado = await Asset.findByIdAndDelete(id);
        if (!assetEliminado) {
            return res.status(404).json({ mensaje: "Asset no encontrado" });
        }

        res.status(200).json({ mensaje: "Asset eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el asset", error: error.message });
    }
};

// Buscar assets por título, descripción, autor o categoría
const buscarAssets = async (req, res) => {
    try {
        const { q } = req.query; // Parámetro de búsqueda

        if (!q) {
            return res.status(400).json({ mensaje: "El parámetro de búsqueda es obligatorio" });
        }

        const assets = await Asset.find({
            $or: [
                { titulo: { $regex: q, $options: 'i' } },
                { descripcion: { $regex: q, $options: 'i' } },
                { autor: { $regex: q, $options: 'i' } },
                { categorias: { $regex: q, $options: 'i' } }
            ]
        });

        if (assets.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron assets con ese criterio de búsqueda" });
        }

        res.status(200).json({ resultados: assets });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar los assets", error: error.message });
    }
};

// Actualizar las vistas de un asset (cuando un usuario ve un asset)
const actualizarVistas = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el asset
        const asset = await Asset.findById(id);
        if (!asset) {
            return res.status(404).json({ mensaje: "Asset no encontrado" });
        }

        // Incrementar las vistas
        asset.vistas += 1;
        await asset.save();

        res.status(200).json({ mensaje: "Vistas actualizadas", asset });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar las vistas", error: error.message });
    }
};

module.exports = {
    crearAsset,
    obtenerAssets,
    obtenerAssetPorId,
    actualizarAsset,
    eliminarAsset,
    buscarAssets,
    actualizarVistas
};
