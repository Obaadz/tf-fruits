import type { Request, Response } from "express";
import { ERROR_MESSAGES, RESPONSE_MESSAGES } from "../types/enums";
import { classifyImage } from "../services/image";

export default class ImageController {
  static async classify(req: Request, res: Response) {
    try {
      const image = req.file;

      if (!image?.buffer) throw new Error(ERROR_MESSAGES.INCORRECT_DATA);

      const label = await classifyImage(image.buffer);

      res
        .status(201)
        .send({ isSuccess: true, label, message: RESPONSE_MESSAGES.SUCCESS });
    } catch (err: any) {
      res
        .status(201)
        .send({ isSuccess: false, message: err.message || ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
