import express from "express";
import imageRoutes from "./image";

const v1Routes = express.Router();

v1Routes.use("/v1", imageRoutes);

export default v1Routes;
