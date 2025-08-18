// migrate-croquettes.js
const mongoose = require('mongoose');
const User = require('./UserSchema'); // adapte le chemin vers ton model

(async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:azerty@gachatcluster.ygych45.mongodb.net/?retryWrites=true&w=majority&appName=GaChatCluster');

     const user = new User({
            id: 4,
            name: "Romane"
        });
    
        await user.save();
        console.log("Utilisateur créé !");

    console.log(`✅ Migration terminée :  utilisateurs mis à jour`);

    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Erreur pendant la migration :', err);
  }
})();
