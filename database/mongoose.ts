import mongoose from 'mongoose'

const MONGO_DB_URI = process.env.MONGO_DB_URI || '';

declare global {
  var mongooseCache: {
    conn: typeof mongoose | undefined;
    promise: Promise<typeof mongoose> | undefined;
  }
}
// To prevent multiple connections in development when using Next.js hot reloading
let cache = global.mongooseCache;

if (!cache) {
  cache = global.mongooseCache = { conn: undefined, promise: undefined };
};

const connectToDatabase = async () => {
  if (!MONGO_DB_URI) throw new Error('Please define the MONGO_DB_URI environment variable');

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGO_DB_URI, { bufferCommands: false });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = undefined;
    throw error;
  }

  console.log('Connected to MongoDB', 'MODE: ' + process.env.NODE_ENV);
  return cache.conn;
}