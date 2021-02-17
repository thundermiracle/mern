export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIREDIN: process.env.JWT_EXPIREDIN || "30d",
};
