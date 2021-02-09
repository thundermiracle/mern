import "colors";
import mongoose from "mongoose";
import env from "../config/environment";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`[MongoDB Connected] ${conn.connection.host}`.green);
  } catch (error) {
    console.log(`MongoDB Error: ${error.message}`.bgRed);
    process.exit(1);
  }
};

export default connectDB;
