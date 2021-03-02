import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";

interface IAddOrder {
  orderItems?: any[];
  shippingAddress: string;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

/**
 * @description Create new order
 * @route POST /api/orders
 */
export const addOrderItems = async (request: Request<{}, {}, IAddOrder>, response: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = request.body;

  if (orderItems == null || orderItems.length === 0) {
    response.status(400);
    throw new Error("No Order Items");
  }

  const order = new OrderModel({
    userId: request.userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  response.status(201).json({
    success: true,
    data: createdOrder,
  });
};
