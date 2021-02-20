export interface ProductData {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  token: string;
}
