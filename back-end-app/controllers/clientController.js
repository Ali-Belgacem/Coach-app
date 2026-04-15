import Client from '../models/Client.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Créer un nouveau client
const createClient = async (req, res) => {
  try {
    const { firstName, lastName, email, telephone, date } = req.body;
    
    // Vérifier si le fichier a été uploadé
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Aucune image uploadée'
      });
    }

    // Vérifier si l'email existe déjà
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      // Supprimer le fichier uploadé
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Erreur suppression fichier:', err);
      });
      
      return res.status(400).json({
        success: false,
        message: 'Un client avec cet email existe déjà'
      });
    }

    // Créer le client dans la base de données
    const client = new Client({
      firstName,
      lastName,
      email,
      telephone,
      date: new Date(date),
      image: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path
      }
    });

    await client.save();

    res.status(201).json({
      success: true,
      message: 'Client créé avec succès',
      data: client
    });

  } catch (error) {
    console.error('Erreur création client:', error);
    
    // Supprimer le fichier uploadé en cas d'erreur
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Erreur suppression fichier:', err);
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création du client',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne'
    });
  }
};

// Récupérer tous les clients
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    
    console.log('Clients bruts de la base de données:', clients); // ← Debug
    
    // Ajouter l'URL complète de l'image
    const clientsWithImageUrl = clients.map(client => {
      const clientObject = client.toObject();
      console.log('Client object:', clientObject); // ← Debug
      
      return {
        ...clientObject,
        imageUrl: `/uploads/clients/${client.image.filename}`
      };
    });

    console.log('Clients avec URL image:', clientsWithImageUrl); // ← Debug

    res.status(200).json({
      success: true,
      count: clients.length,
      data: clientsWithImageUrl
    });

  } catch (error) {
    console.error('Erreur récupération clients:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des clients'
    });
  }
};

// Récupérer un client par ID
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client non trouvé'
      });
    }

    const clientWithImageUrl = {
      ...client.toObject(),
      imageUrl: `/uploads/clients/${client.image.filename}`
    };

    res.status(200).json({
      success: true,
      data: clientWithImageUrl
    });

  } catch (error) {
    console.error('Erreur récupération client:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération du client'
    });
  }
};

// Supprimer un client
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client non trouvé'
      });
    }

    // Supprimer le fichier image
    if (client.image && client.image.path) {
      fs.unlink(client.image.path, (err) => {
        if (err) console.error('Erreur suppression fichier:', err);
      });
    }

    await Client.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Client supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur suppression client:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression du client'
    });
  }
};

export {
  createClient,
  getAllClients,
  getClientById,
  deleteClient
};