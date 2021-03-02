import fetchWrapper from "../lib/fetchWrapper";
import { Order } from "../store/order/types";

interface IOrderService {
  create(order: Order): Promise<Order | undefined>;
}

class OrderService implements IOrderService {
  async create(order: Order): Promise<Order | undefined> {
    const data = await fetchWrapper.post<Order>("/api/orders", {
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return data;
  }
}

const productService = new OrderService();

export default productService;
