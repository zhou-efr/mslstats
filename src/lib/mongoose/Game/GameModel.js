import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    title: {type: String, required: true},
    expectedDuration: {type: Number, required: true},
    totalDuration: {type: Number, required: true},
    finished: {type: Boolean, required: true},
    numberOfSessions: {type: Number, required: true},
    thumbnail: {type: String, required: false},
    youtube: {type: String, required: false},
    sessions: [String],
});

module.exports = mongoose.models.Game || mongoose.model('Game', gameSchema);