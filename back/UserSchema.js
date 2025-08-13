const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    attemps: { type: Number, default: 0 },
    lastreset: { type: Date, default: null },
    invocations: { type: Map, of: Number, default: {} }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
