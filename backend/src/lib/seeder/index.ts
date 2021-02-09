import init from "../init";

import DataUsers from "./DataUsers";
import DataProducts from "./DataProducts";

import ProductModel from "../../models/ProductModel";
import OrderModel from "../../models/OrderModel";
import UserModel from "../../models/UserModel";
import mongoose from "mongoose";

const truncateData = async () => {
  await ProductModel.deleteMany();
  await OrderModel.deleteMany();
  await UserModel.deleteMany();
};

const importData = async () => {
  try {
    // delete data
    await truncateData();

    // import UserModel
    const createdUsers: any = await UserModel.insertMany(DataUsers as any);

    // import ProductModel
    const adminUser = createdUsers[0];
    const sampleProducts = DataProducts.map((product) => ({
      ...product,
      userId: mongoose.Types.ObjectId(adminUser._id),
    }));
    await ProductModel.insertMany(sampleProducts as any);
    process.exit(0);
  } catch (err) {
    console.error(`${err.message}`.bgRed);
    process.exit(1);
  }
};

init().then(() => {
  importData();
});
