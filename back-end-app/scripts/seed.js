import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import connectDB from "../config/mongodb.js";
import Client from "../models/Client.js";
import Transformation from "../models/Transformation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");

const backendUploadsDir = path.join(projectRoot, "back-end-app", "uploads");
const clientsUploadDir = path.join(backendUploadsDir, "clients");
const transformationsUploadDir = path.join(
  backendUploadsDir,
  "transformations",
);
const frontendAssetsDir = path.join(
  projectRoot,
  "front-end-app",
  "src",
  "assets",
);

dotenv.config({ path: path.join(projectRoot, "back-end-app", ".env") });

const ensureDirectory = (directoryPath) => {
  fs.mkdirSync(directoryPath, { recursive: true });
};

const copyAsset = (sourceFileName, targetFileName) => {
  const sourcePath = path.join(frontendAssetsDir, sourceFileName);
  const targetPath = path.join(transformationsUploadDir, targetFileName);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Asset introuvable: ${sourcePath}`);
  }

  fs.copyFileSync(sourcePath, targetPath);
  return targetFileName;
};

const seedClients = async () => {
  const existingCount = await Client.countDocuments();
  if (existingCount > 0) {
    return { inserted: 0, skipped: true };
  }

  const clientImages = [
    "client-1755617515376-933618279.jpg",
    "client-1755618369013-367681990.JPG",
    "client-1756136130899-532191522.jpg",
  ];

  const [imageOne, imageTwo, imageThree] = clientImages;

  const documents = [
    {
      firstName: "Ali",
      lastName: "Benali",
      email: "ali.benali@example.com",
      telephone: "+213 555 100 001",
      date: new Date("1995-04-12"),
      image: {
        filename: imageOne,
        originalName: imageOne,
        path: path.join(clientsUploadDir, imageOne),
      },
    },
    {
      firstName: "Sara",
      lastName: "Mekki",
      email: "sara.mekki@example.com",
      telephone: "+213 555 100 002",
      date: new Date("1998-09-23"),
      image: {
        filename: imageTwo,
        originalName: imageTwo,
        path: path.join(clientsUploadDir, imageTwo),
      },
    },
    {
      firstName: "Yacine",
      lastName: "Haddad",
      email: "yacine.haddad@example.com",
      telephone: "+213 555 100 003",
      date: new Date("1992-01-08"),
      image: {
        filename: imageThree,
        originalName: imageThree,
        path: path.join(clientsUploadDir, imageThree),
      },
    },
  ];

  await Client.insertMany(documents);
  return { inserted: documents.length, skipped: false };
};

const seedTransformations = async () => {
  const existingCount = await Transformation.countDocuments();
  if (existingCount > 0) {
    return { inserted: 0, skipped: true };
  }

  const pairs = [
    ["Transformation2.jpg", "Transformation1.jpg", "12 weeks", "Ali Benali"],
    ["Transformation4.jpg", "Transformation3.jpg", "8 weeks", "Sara Mekki"],
    ["Transformation6.jpg", "Transformation5.jpg", "16 weeks", "Yacine Haddad"],
    ["Transformation8.jpg", "Transformation7.jpg", "10 weeks", "Nadia Cherif"],
  ];

  const documents = pairs.map(
    ([beforeAsset, afterAsset, duration, clientId], index) => {
      const beforeFileName = copyAsset(
        beforeAsset,
        `seed-transformation-before-${index + 1}.jpg`,
      );
      const afterFileName = copyAsset(
        afterAsset,
        `seed-transformation-after-${index + 1}.jpg`,
      );

      return {
        clientId,
        imgBefore: `http://localhost:5000/uploads/transformations/${beforeFileName}`,
        imgAfter: `http://localhost:5000/uploads/transformations/${afterFileName}`,
        duration,
      };
    },
  );

  await Transformation.insertMany(documents);
  return { inserted: documents.length, skipped: false };
};

const main = async () => {
  try {
    ensureDirectory(clientsUploadDir);
    ensureDirectory(transformationsUploadDir);

    await connectDB();

    const clientResult = await seedClients();
    const transformationResult = await seedTransformations();

    console.log("Seed terminé:", {
      clients: clientResult,
      transformations: transformationResult,
    });

    process.exit(0);
  } catch (error) {
    console.error("Erreur du seed:", error.message);
    process.exit(1);
  }
};

main();
