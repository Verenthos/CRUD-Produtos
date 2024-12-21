export interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type CreateProductDTO = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
  export type UpdateProductDTO = Partial<CreateProductDTO>;