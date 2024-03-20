import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import cors from "cors";
import cloudinary from "./cloudinary/cloudinary.js";

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get("/", (req, res) => {
    res.send("Welcome to this page");
});

app.post("/", async (req, res) => {
    const { image } = req.body; // Assuming the image data is sent as 'image' in the request body

    try {
        const upload=await cloudinary.uploader.upload(image, {
            upload_preset : 'ssk11nmt',
            allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
        });
        const publicId=upload.public_id;
        console.log(publicId);
        res.status(200).json({ publicId });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => console.log(`App is listening on port ${port}`));
