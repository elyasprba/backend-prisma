export interface ProductsPayload {
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
}

export interface GetAllProductParams {
  limit: number;
  skip: number;
  name?: string;
  category?: string;
}
