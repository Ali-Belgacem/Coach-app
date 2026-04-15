import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUrl = process.env.MONGODB_URL;

  if (!mongoUrl) {
    throw new Error("MONGODB_URL est manquant dans le fichier .env");
  }

  mongoose.connection.on("connected", () => {
    console.log("DB connected");
  });

  // Use dbName option instead of appending '/coaching' to avoid malformed URIs.
  await mongoose.connect(mongoUrl, { dbName: "coaching" });
};

export default connectDB;
