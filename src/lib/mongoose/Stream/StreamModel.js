import mongoose from 'mongoose';

// const streamedGameSchema = new mongoose.Schema();

const streamSchema = new mongoose.Schema({
    id: {type: String, required: true},
    title: {type: String, required: true},
    url: {type: String, required: true},

    streamer_id: {type: String, required: true},
    streamer_name: {type: String, required: true},

    duration: {type: Number, required: true},
    started_at: {type: Date, required: true},

    game_start: {type: Number},
    game_end: {type: Number},

    game_planned: {type: String},
    game_played: {type: String},
    game_secondary: {type: String},

    games: {
        type: [{
            title: {type: String, required: true},
            start: {type: Number},
            end: {type: Number},
            planned: {type: Boolean},
        }]
    },
});

module.exports = mongoose.models.Stream || mongoose.model('Stream', streamSchema);