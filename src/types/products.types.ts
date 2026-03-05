// src/types/products.types.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  photos: string; 
}

export type CreateProductRequest = Omit<Product, "id"> & { id?: number };
export type UpdateProductRequest = Omit<Product, "id">;
