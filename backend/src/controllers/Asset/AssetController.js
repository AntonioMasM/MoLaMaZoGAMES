const Asset = require('../../models/Asset');
const Usuario = require('../../models/Usuario');
const mongoose = require('mongoose');
const { eliminarArchivoCloudinary } = require('../../services/cloudinaryService');

// Crear un nuevo asset
const crearAsset = async (req, res) => {
  try {
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

    // Validación de campos obligatorios
    if (!titulo || !descripcion || !autor || !imagenPrincipal || !usuarioCreador) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
    }

    // Validar que usuarioCreador sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(usuarioCreador)) {
      return res.status(400).json({ mensaje: "ID de usuarioCreador inválido" });
    }

    // Crear nuevo asset
    const nuevoAsset = new Asset({
      titulo,
      descripcion,
      autor,
      imagenPrincipal, // Ahora es un String (secure_url)
      galeriaMultimedia: galeriaMultimedia || [],
      formatos: formatos || [],
      categorias: categorias || [],
      usuarioCreador
    });

    // Guardar en base de datos
    await nuevoAsset.save();

    // Responder al cliente
    return res.status(201).json({ mensaje: "Asset creado con éxito", asset: nuevoAsset });

  } catch (error) {
    console.error("🔥 Error al crear el asset:", error);
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

    const asset = await Asset.findById(id);
    if (!asset) {
      return res.status(404).json({ mensaje: "Asset no encontrado" });
    }

    asset.titulo = titulo || asset.titulo;
    asset.descripcion = descripcion || asset.descripcion;
    asset.autor = autor || asset.autor;
    asset.imagenPrincipal = imagenPrincipal || asset.imagenPrincipal;
    asset.galeriaMultimedia = galeriaMultimedia || asset.galeriaMultimedia;
    asset.formatos = formatos || asset.formatos;
    asset.categorias = categorias || asset.categorias;

    await asset.save();
    res.status(200).json({ mensaje: "Asset actualizado con éxito", asset });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el asset", error: error.message });
  }
};

// Eliminar un asset y borrar archivos de Cloudinary
const eliminarAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const asset = await Asset.findById(id);
    if (!asset) {
      return res.status(404).json({ mensaje: "Asset no encontrado" });
    }

    // Eliminar imagen principal
    if (asset.imagenPrincipal?.public_id) {
      await eliminarArchivoCloudinary(asset.imagenPrincipal.public_id, "image");
    }

    // Eliminar galería multimedia
    for (const item of asset.galeriaMultimedia) {
      if (item.public_id) {
        await eliminarArchivoCloudinary(item.public_id, item.tipo === "video" ? "video" : "image");
      }
    }

    // Eliminar formatos descargables
    for (const formato of asset.formatos) {
      if (formato.public_id) {
        await eliminarArchivoCloudinary(formato.public_id, "raw");
      }
    }

    // Eliminar el documento en MongoDB
    await Asset.findByIdAndDelete(id);

    res.status(200).json({ mensaje: "Asset y archivos eliminados con éxito" });
  } catch (error) {
    console.error("🔥 Error al eliminar el asset:", error);
    res.status(500).json({ mensaje: "Error al eliminar asset", error: error.message });
  }
};

// Buscar assets
const buscarAssets = async (req, res) => {
  try {
    const { q } = req.query;
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

// Actualizar las vistas de un asset
const actualizarVistas = async (req, res) => {
  try {
    const { id } = req.params;

    const asset = await Asset.findById(id);
    if (!asset) {
      return res.status(404).json({ mensaje: "Asset no encontrado" });
    }

    asset.vistas += 1;
    await asset.save();

    res.status(200).json({ mensaje: "Vistas actualizadas", asset });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar las vistas", error: error.message });
  }
};

// Obtener assets de un usuario
const obtenerAssetsPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
      return res.status(400).json({ mensaje: "ID de usuario inválido" });
    }

    const assets = await Asset.find({ usuarioCreador: usuarioId });

    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los assets del usuario", error: error.message });
  }
};

const obtenerAssetsPorCategoria = async (req, res) => {
  try {
    const { categoriaId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(categoriaId)) {
      return res.status(400).json({ mensaje: "ID de categoría inválido" });
    }

    const assets = await Asset.find({ categorias: categoriaId }); // Si tu modelo usa "categoria"
    
    res.status(200).json(assets);
  } catch (error) {
    console.error("🔥 Error al obtener assets por categoría:", error);
    res.status(500).json({ mensaje: "Error al obtener assets por categoría", error: error.message });
  }
};

const obtenerAssetsPorNombreCategoria = async (req, res) => {
  try {
    const { nombreCategoria } = req.params;

    if (!nombreCategoria) {
      return res.status(400).json({ mensaje: "El nombre de la categoría es obligatorio" });
    }

    const assets = await Asset.find({ categorias: { $in: [nombreCategoria] } });

    res.status(200).json(assets);
  } catch (error) {
    console.error("🔥 Error al obtener assets por nombre de categoría:", error);
    res.status(500).json({ mensaje: "Error al obtener assets por nombre de categoría", error: error.message });
  }
};
module.exports = {
  crearAsset,
  obtenerAssets,
  obtenerAssetPorId,
  actualizarAsset,
  eliminarAsset,
  buscarAssets,
  actualizarVistas,
  obtenerAssetsPorUsuario,
  obtenerAssetsPorCategoria,
  obtenerAssetsPorNombreCategoria,
};
