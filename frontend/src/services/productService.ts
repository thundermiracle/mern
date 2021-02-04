import { ProductData } from '../types'
import products from './data/products'

interface IProductService {
  getAll(): ProductData[]; 
  get(id: string): ProductData | undefined;
}

class ProductService implements IProductService {
  get(id: string): ProductData | undefined {
    return products.find(({ _id }: ProductData) => _id === id);
  }

  getAll(): ProductData[] {
    return products;
  }
}

const productService = new ProductService();

export default productService;
