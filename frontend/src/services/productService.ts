import { ProductData } from "../types";
interface IProductService {
  get(id: string): Promise<ProductData | undefined>;
  getAll(): Promise<ProductData[]>;
}

class ProductService implements IProductService {
  async get(id: string): Promise<ProductData | undefined> {
    const res = await fetch(`/api/products/${id}`);

    return res.json();
  }

  async getAll(): Promise<ProductData[]> {
    const res = await fetch("/api/products");

    return res.json();
  }
}

const productService = new ProductService();

export default productService;
