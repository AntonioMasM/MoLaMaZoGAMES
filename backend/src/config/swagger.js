const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const fs = require("fs");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de MoLaMaZoGAMES",
            version: "1.0.0",
            description: "Documentación de la API de la página MoLaMaZoGAMES.",
        },
        servers: [
            {
                url: "http://localhost:5000",  // Cambia si tu servidor está en otro puerto
                description: "Servidor local"
            }
        ],
    },
    // Usamos el archivo swagger.yaml ubicado en la carpeta "doc"
    apis: [path.join(__dirname, "../doc/swagger.yaml")], 
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    // Configuración de Swagger UI
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📄 Swagger Docs disponible en http://localhost:5000/api/docs");
};

module.exports = swaggerDocs;
