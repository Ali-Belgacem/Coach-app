import mongoose from "mongoose";

const transformationSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true
  },
  imgBefore: {
    type: String,
    required: true
  },
  imgAfter: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: "12 weeks"
  },
  name: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  dateOfBirth: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Transformation = mongoose.model("Transformation", transformationSchema);

export default Transformation;