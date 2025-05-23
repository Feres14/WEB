// routes/requestRoutes.js
const express = require('express');
const router = express.Router();

// Importer la fonction du contrôleur de demandes
const { submitAccountRequest } = require('../controllers/requestController');

// Définir la route pour soumettre une demande de compte
// C'est une route POST et elle est publique (pas de middleware 'protect')
router.post('/account', submitAccountRequest);


// Plus tard, on ajoutera des routes ici pour que les admins puissent
// voir et traiter ces demandes (ex: GET /api/requests, PUT /api/requests/:id/approve)
// Ces routes admin devront être protégées par protect et admin.


// Exporter le routeur
module.exports = router;