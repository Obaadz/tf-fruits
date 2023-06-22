import { ERROR_MESSAGES, RESPONSE_MESSAGES } from "../types/enums.js";
import { classifyImage } from "../services/image.js";

export default class ImageController {
  static async classify(req, res) {
    try {
      const image = req.file;

      if (!image?.buffer) throw new Error(ERROR_MESSAGES.INCORRECT_DATA);

      const label = await classifyImage(image.buffer);

      res
        .status(201)
        .send({ isSuccess: true, label, message: RESPONSE_MESSAGES.SUCCESS });
    } catch (err) {
      res
        .status(201)
        .send({ isSuccess: false, message: err.message || ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
