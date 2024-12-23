import { connect } from "mongoose";

let cachedConnection = null;

if (!process.env.MONGODB_URI) {
  //   console.log("process.env: ", process.env);
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
export async function connectToMongoDB() {
  if (cachedConnection) {
    console.log("Using cached db connection");
    return cachedConnection;
  }

  try {
    const cnx = await connect(process.env.MONGODB_URI, {
      dbName: "Ecowell",
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000, // increasing timeout to 30 seconds
    });

    cachedConnection = cnx.connection;

    console.log("New mongodb connection established");
    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
