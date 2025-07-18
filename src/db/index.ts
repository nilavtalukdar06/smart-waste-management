import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI as string;

if (!mongodbUri) {
  throw new Error(
    "please set the database connection string in the environment variables"
  );
}

if (!global.mongoose) {
  global.mongoose = { connection: null, promise: null };
}

const cachedConnection = global.mongoose;

const connectToMongoDb = async () => {
  if (cachedConnection.connection) {
    return cachedConnection.connection;
  }
  if (!cachedConnection.promise) {
    cachedConnection.promise = mongoose
      .connect(mongodbUri)
      .then(() => mongoose.connection)
      .catch((error) => {
        throw error;
      });
  }
  try {
    cachedConnection.connection = await cachedConnection.promise;
  } catch (error) {
    cachedConnection.promise = null;
    throw error;
  }
  return cachedConnection.connection;
};

export default connectToMongoDb;
