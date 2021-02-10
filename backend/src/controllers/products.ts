import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { isValidObjectId } from "mongoose";
import ProductModel from "../models/ProductModel";

/**
 * @description Fetch all products
 * @route GET /api/products
 */
export const getProducts = asyncHandler(async (_: Request, response: Response) => {
  const products = await ProductModel.find({});

  response.json({
    success: true,
    data: products,
  });
});

/**
 * @description Fetch Single product by id
 * @route GET /api/products/:id
 */
export const getProduct = asyncHandler(async (request: Request, response: Response) => {
  // Handle all errors in ErrorHandler
  // if (!isValidObjectId(request.params.id)) {
  //   response.status(404).json("Invalid ID");
  // }

  const product = await ProductModel.findById(request.params.id);
  if (product) {
    response.json({
      success: true,
      data: product,
    });
  } else {
    response.status(404);
    throw new Error("Not Found");
  }
});
