const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
                url: "http://localhost:5000",
                description: "Servidor local"
            }
        ],
    },
    apis: ["./src/routes/*.js"], // Swagger documentará todas las rutas aquí
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📄 Swagger Docs disponible en http://localhost:5000/api/docs");
};

module.exports = swaggerDocs;
