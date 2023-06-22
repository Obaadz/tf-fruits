import * as tf from "@tensorflow/tfjs-node";
import classes from "../utils/classes.js";

export async function classifyImage(imageBuffer) {
  console.log("start classification of image...");
  const model = await loadMobilenet();

  console.log("preprocessing start...");
  // Preprocess input image
  const image = await loadImage(imageBuffer);
  const processedImage = preprocessImage(image);

  console.log("run the model on image...");
  // Run inference on the model
  const predictions = model.predict(processedImage);

  // Display the result
  const index = await predictions.as1D().argMax().data();
  const label = classes[index];

  console.log("classification of image has been end...");
  return label;
}

async function loadMobilenet() {
  const modelURL = "./tensorflow/1/model.json";
  const mobilenet = await tf.loadLayersModel(tf.io.fileSystem(modelURL));

  return mobilenet;
}

async function loadImage(imageBuffer) {
  const decodedImage = tf.node.decodeImage(imageBuffer);
  return decodedImage;
}

// Utility function to preprocess the input image
function preprocessImage(image) {
  // Perform any required preprocessing steps such as resizing, normalization, etc.
  const resizedImage = tf.image.resizeBilinear(image, [224, 224]);
  const expandedImage = resizedImage.expandDims();
  const normalizedImage = expandedImage.div(255.0);
  return normalizedImage;
}
