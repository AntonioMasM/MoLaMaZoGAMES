const express = require("express");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

let dropboxRefreshToken = process.env.DROPBOX_REFRESH_TOKEN; // O puedes cargarlo desde DB si prefieres

const getAccessToken = async () => {
    const { DROPBOX_CLIENT_ID, DROPBOX_CLIENT_SECRET } = process.env;
    try {
        const response = await axios.post("https://api.dropboxapi.com/oauth2/token", null, {
            params: {
                grant_type: "refresh_token",
                refresh_token: dropboxRefreshToken,
                client_id: DROPBOX_CLIENT_ID,
                client_secret: DROPBOX_CLIENT_SECRET,
            },
        });
        return response.data.access_token;
    } catch (err) {
        console.error("❌ Error al obtener access_token:", err.response?.data || err.message);
        throw err;
    }
};

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
        const accessToken = await getAccessToken();

        const fileBuffer = fs.readFileSync(file.path);
        const dropboxPath = `/uploads/${Date.now()}_${file.originalname}`;

        const response = await axios.post("https://content.dropboxapi.com/2/files/upload", fileBuffer, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Dropbox-API-Arg": JSON.stringify({
                    path: dropboxPath,
                    mode: "add",
                    autorename: true,
                    mute: false,
                }),
                "Content-Type": "application/octet-stream",
            },
        });

        fs.unlinkSync(file.path); // Limpieza
        res.json({ url: `https://www.dropbox.com/home${response.data.path_display}?raw=1` });
    } catch (err) {
        console.error("❌ Error en /upload:", err);
        res.status(500).json({ message: "Error al subir a Dropbox" });
    }
});

module.exports = router;
