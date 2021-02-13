import fetchWrapper from "../lib/fetchWrapper";
import { Product } from "../store/product/types";
import { ProductData } from "../types";
interface IProductService {
  get(id: string): Promise<ProductData | undefined>;
  getAll(): Promise<ProductData[]>;
}

class ProductService implements IProductService {
  async get(id: string): Promise<ProductData | undefined> {
    const data = await fetchWrapper.get<ProductData>(`/api/products/${id}`);

    return data;
  }

  async getAll(): Promise<ProductData[]> {
    const data = await fetchWrapper.get<ProductData[]>("/api/products");

    return data || [];
  }
}

const productService = new ProductService();

export default productService;
