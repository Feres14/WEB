// routes/creditRoutes.js
const express = require('express');
const router = express.Router();

// Importer toutes les fonctions nécessaires du contrôleur
const {
    createCreditApplication,
    getMyCreditApplications,
    getMySingleCreditApplication,
    deleteMyApplication,
    updateMyApplication // <-- Importer la fonction de mise à jour
} = require('../controllers/creditController');

// Importer les middlewares
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// --- Définition des Routes ---

// POST /api/credits/apply (Créer une demande avec fichiers)
router.post(
    '/apply',
    protect,
    upload.fields([ { name: 'justificatifRevenu', maxCount: 1 }, { name: 'attestationTravail', maxCount: 1 } ]),
    createCreditApplication
);

// GET /api/credits/my-applications (Lister les demandes du client)
router.get( '/my-applications', protect, getMyCreditApplications );

// GET /api/credits/my-applications/:id (Voir UNE demande du client)
router.get( '/my-applications/:id', protect, getMySingleCreditApplication );

// DELETE /api/credits/my-applications/:id (Supprimer une demande du client)
router.delete( '/my-applications/:id', protect, deleteMyApplication );

// --- NOUVELLE ROUTE POUR MODIFIER ---
// PUT /api/credits/my-applications/:id (Modifier une demande du client)
// Note: Pas de 'upload' ici car on ne modifie que le texte pour l'instant
router.put( '/my-applications/:id', protect, updateMyApplication );
// --- FIN NOUVELLE ROUTE ---


// Exporter le routeur
module.exports = router;