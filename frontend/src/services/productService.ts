import { ProductData } from "../types";
interface IProductService {
  get(id: string): Promise<ProductData | undefined>;
  getAll(): Promise<ProductData[]>;
}

interface ResponseJson {
  status: boolean;
  data: any;
}
class ProductService implements IProductService {
  async get(id: string): Promise<ProductData | undefined> {
    const res = await fetch(`/api/products/${id}`);

    const { status, data } = (await res.json()) as ResponseJson;

    return data;
  }

  async getAll(): Promise<ProductData[]> {
    const res = await fetch("/api/products");

    const { status, data } = (await res.json()) as ResponseJson;

    return data;
  }
}

const productService = new ProductService();

export default productService;
