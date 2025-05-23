// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

// Importer toutes les fonctions nécessaires du contrôleur admin
const {
    createUserByAdmin,
    getAllUsers,
    getAllCreditApplications,   // Pour lister toutes les demandes
    getCreditApplicationById,   // Pour voir une demande en détail
    updateApplicationDetails    // Pour mettre à jour statut/commentaire
} = require('../controllers/adminController');

// Importer les middlewares d'authentification et d'autorisation
const { protect, admin } = require('../middleware/authMiddleware');

// --- Routes pour la gestion des Utilisateurs ---
router.post('/create-user', protect, admin, createUserByAdmin);
router.get('/users', protect, admin, getAllUsers);

// --- Routes pour la gestion des Demandes de Crédit par l'Admin ---
// GET /api/admin/credits (Lister toutes les demandes de crédit)
router.get('/credits', protect, admin, getAllCreditApplications);

// GET /api/admin/credits/:id (Voir les détails d'une demande spécifique)
router.get('/credits/:id', protect, admin, getCreditApplicationById);

// PUT /api/admin/credits/:id/manage (Mettre à jour le statut et/ou le commentaire d'une demande)
router.put('/credits/:id/manage', protect, admin, updateApplicationDetails);

module.exports = router;