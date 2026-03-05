export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  photos: string[];
  category?: string;
  isFeatured?: boolean;
}

export type CreateProductRequest = Omit<Product, "id">;

export type UpdateProductRequest = Partial<Omit<Product, "id">>;
