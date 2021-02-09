import { Request, Response } from "express";
import DataProducts from "../lib/seeder/DataProducts";

export function getProducts(_: Request, response: Response) {
  response.json({
    success: true,
    data: DataProducts,
  });
}

export function getProduct(request: Request<{ id: string }>, response: Response) {
  const product = DataProducts.find((product) => product._id === request.params.id);
  if (product) {
    response.json({
      success: true,
      data: product,
    });
  } else {
    response.status(404);
    response.json({
      success: false,
      msg: "Not Found",
    });
  }
}
