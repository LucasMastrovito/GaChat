const mongoose = require('mongoose');
require('dotenv').config();

const db = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:azerty@gachatcluster.ygych45.mongodb.net/?retryWrites=true&w=majority&appName=GaChatCluster', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connecté');
  } catch (err) {
    console.error('❌ Erreur connexion MongoDB :', err.message);
    process.exit(1);
  }
};

module.exports = db;