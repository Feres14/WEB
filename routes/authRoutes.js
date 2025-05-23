// routes/authRoutes.js

console.log('>>> Fichier routes/authRoutes.js chargé.'); // Utile pour voir si le fichier est lu

const express = require('express');
const router = express.Router();

// Importer UNIQUEMENT la fonction de login depuis le contrôleur
// (elle est exportée comme 'loginUser' même si elle s'appelle autrement dans le fichier contrôleur)
const { loginUser } = require('../controllers/authController');

// Définir la route pour le login
console.log('>>> Définition de la route POST /login');
router.post('/login', loginUser); // Associe la route POST /login à la fonction loginUser

// Exporter le routeur pour l'utiliser dans server.js
module.exports = router;