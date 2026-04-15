import express from 'express';
import {
  createClient,
  getAllClients,
  getClientById,
  deleteClient
} from '../controllers/clientController.js';
import { uploadClient } from '../middleware/upload.js';
import { validateClient } from '../middleware/validation.js';

const router = express.Router();

// Routes pour les clients
router.post('/clients', uploadClient.single('image'), validateClient, createClient);
router.get('/clients', getAllClients);
router.get('/clients/:id', getClientById);
router.delete('/clients/:id', deleteClient);

export default router;