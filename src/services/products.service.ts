// src/services/products.service.ts
import { api } from "@/lib/api";
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types/products.types";

type ApiProduct = Omit<Product, "photos"> & { photos: string | string[] };

function normalizeProduct(p: ApiProduct): Product {
  return {
    ...p,
    photos: Array.isArray(p.photos) ? p.photos : p.photos ? [p.photos] : [],
  };
}

export const productsService = {
  async list(): Promise<Product[]> {
    const { data } = await api.get<ApiProduct[]>("/products");
    return data.map(normalizeProduct);
  },

  async listByCategory(category: string): Promise<Product[]> {
    const { data } = await api.get<ApiProduct[]>(
      `/products/category/${encodeURIComponent(category)}`,
    );
    return data.map(normalizeProduct);
  },

  async getById(id: number): Promise<Product> {
    const { data } = await api.get<ApiProduct>(`/products/${id}`);
    return normalizeProduct(data);
  },

  async create(payload: CreateProductRequest): Promise<Product> {
    const { data } = await api.post<ApiProduct>("/products", payload);
    return normalizeProduct(data);
  },

  async update(id: number, payload: UpdateProductRequest): Promise<Product> {
    const { data } = await api.put<ApiProduct>(`/products/${id}`, payload);
    return normalizeProduct(data);
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};
