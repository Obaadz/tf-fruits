import express from "express";
import multer from "multer";
import ImageController from "../../controllers/imageController.js";

const imageRoutes = express.Router();
const upload = multer();

imageRoutes.post("/images/classify", upload.single("image"), ImageController.classify);

export default imageRoutes;
