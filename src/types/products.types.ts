export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  photos: string[];
  category?: string;
  isFeatured?: boolean;
}

export type CreateProductRequest = {
  name: string;
  description: string;
  price: number;
  photos: string[] | string;
  category?: string;
};

export type UpdateProductRequest = Partial<{
  name: string;
  description: string;
  price: number;
  photos: string[] | string;
  category?: string;
}>;
