import Transformation from "../models/Transformation.js";

// Récupérer toutes les transformations
export const getAllTransformations = async (req, res) => {
  try {
    const transformations = await Transformation.find().sort({ createdAt: -1 });
    res.status(200).json(transformations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle transformation
export const createTransformation = async (req, res) => {
  try {
    const { clientId, imgBefore, imgAfter, duration, name, phone, email, dateOfBirth } = req.body;
    
    if (!clientId || !imgBefore || !imgAfter) {
      return res.status(400).json({ message: "Veuillez fournir toutes les informations nécessaires" });
    }
    
    const newTransformation = new Transformation({
      clientId,
      imgBefore,
      imgAfter,
      duration: duration || "12 weeks",
      name,
      phone,
      email,
      dateOfBirth
    });
    
    const savedTransformation = await newTransformation.save();
    res.status(201).json(savedTransformation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une transformation
export const deleteTransformation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransformation = await Transformation.findByIdAndDelete(id);
    
    if (!deletedTransformation) {
      return res.status(404).json({ message: "Transformation non trouvée" });
    }
    
    res.status(200).json({ message: "Transformation supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};