import mongoose from 'mongoose'
const MONGODB_URI = process.env['MONGO_URI']

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    console.log(MONGODB_URI);
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        // const opts = {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     bufferCommands: false,
        //     bufferMaxEntries: 0,
        //     useFindAndModify: true,
        //     useCreateIndex: true
        // }

        cached.promise = await mongoose.connect(MONGODB_URI)
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect
