import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface ProductClientGrpc {
  createProduct: (data: {
    name: string;
    description: string;
    price: number;
  }) => Observable<{ product: Product }>;
  findProducts: (data: object) => Observable<{ products: Product[] }>;
}
