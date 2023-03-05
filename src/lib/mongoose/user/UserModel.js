import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // auth0_id: { type: String, required: true },
    // name: { type: String, required: true },
    email: { type: String, required: true },

    followed_streams: { type: Array, required: true },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);