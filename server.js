// server.js
require('dotenv').config();
const path = require('path'); // Pour servir les fichiers statiques
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const creditRoutes = require('./routes/creditRoutes');
const requestRoutes = require('./routes/requestRoutes');

console.log('>>> Initialisation du serveur...');
connectDB();
const app = express();
console.log('>>> Application Express initialisée.');

app.use(cors());
console.log('>>> Middleware CORS activé.');
app.use(express.json());
console.log('>>> Middleware express.json activé.');

// Servir statiquement le dossier 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log(`>>> Service statique pour /uploads configuré (pointe vers ${path.join(__dirname, 'uploads')}).`);

// Routes API
app.get('/', (req, res) => { res.send('<h1>API Crédit App est Fonctionnelle !</h1>'); });
console.log('>>> Route GET / définie.');
app.use('/api/auth', authRoutes); console.log('>>> Routes /api/auth enregistrées.');
app.use('/api/admin', adminRoutes); console.log('>>> Routes /api/admin enregistrées.');
app.use('/api/credits', creditRoutes); console.log('>>> Routes /api/credits enregistrées.');
app.use('/api/requests', requestRoutes); console.log('>>> Routes /api/requests enregistrées.');

// Middlewares de Gestion des Erreurs
app.use((req, res, next) => { console.log(`>>> Middleware 404 pour ${req.method} ${req.originalUrl}`); const error = new Error(`Non trouvé - ${req.method} ${req.originalUrl}`); res.status(404); next(error); });
app.use((err, req, res, next) => { const statusCode = res.statusCode === 200 ? 500 : res.statusCode; res.status(statusCode); console.error("--- ERREUR CAPTURÉE ---"); console.error("Status:", statusCode, "Msg:", err.message, "URL:", req.originalUrl); if (process.env.NODE_ENV !== 'production') { console.error("Stack:", err.stack); } console.error("-----------------------"); res.json({ message: err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack }); });
console.log('>>> Middlewares de gestion des erreurs enregistrés.');

const PORT = process.env.PORT || 5000;
console.log(`>>> Tentative de démarrage du serveur sur le port ${PORT}...`);
app.listen(PORT, () => console.log(`\n🎉 Serveur démarré sur ${PORT} ! 🎉`));