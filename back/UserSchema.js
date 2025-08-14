const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    attemps: { type: Number, default: 0 },
    lastreset: { type: Date, default: null },
    invocations: { type: Map, of: Number, default: {} },
    kibbles: { type: Number, default: 0 },
    lastConnexion: { type: Date, default: new Date() }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
