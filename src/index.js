import express from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import v1Routes from "./routes/v1/index.js";
import { ERROR_MESSAGES } from "./types/enums.js";

config();

if (!process.env.environment || process.env.environment !== "PRODUCTION") {
  console.log("Local environment...");
  config({ path: ".env.local" });
}

if (!process.env.SECRET) throw new Error(ERROR_MESSAGES.NO_SECRET_KEY_DEFINED);

const PORT = process.env.PORT || 5000,
  DB_URI = process.env.DB_URI || "";

const app = express();
const bodyParser = {
  urlencoded: express.urlencoded({ limit: "5mb", extended: true }),
  json: express.json({ limit: "5mb" }),
};

app.use(bodyParser.urlencoded);
app.use(bodyParser.json);
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(v1Routes);

app.listen(PORT, async () => {
  console.log(`Listening on port: ${PORT}`);

  mongoose.set("strictQuery", false);
  mongoose.connect(DB_URI).then(() => {
    console.log("connected to database success");
  });
});
