import "colors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./connectDB";

export default function init() {
  return connectDB();
}
