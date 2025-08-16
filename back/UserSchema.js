const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    attemps: { type: Number, default: 0 },
    attempsRare: { type: Number, default: 0 },
    attempsMythic: { type: Number, default: 0 },
    attempsLegendary: { type: Number, default: 0 },
    lastreset: { type: Date, default: null },
    invocations: { type: Map, of: Number, default: {} },
    kibbles: { type: Number, default: 0 },
    lastConnexion: { type: Date, default: new Date() },
    achievements: {
        invocations: { type: Number, default: 0 },
        collection: { type: Number, default: 0 },
        rarity: { type: Map, of: Number, default: {} }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
