import mongoose from 'mongoose';

const streamSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },

    streamer_id: { type: String, required: true },
    streamer_name: { type: String, required: true },

    duration: { type: Number, required: true },
    started_at: { type: Date, required: true },

    game_start: { type: Number, required: true },
    game_end: { type: Number, required: true },

    game_planned: { type: String, required: true },
    game_played: { type: String, required: true },
    game_secondary: { type: String, required: false },
});

module.exports = mongoose.models.Stream || mongoose.model('Stream', streamSchema);