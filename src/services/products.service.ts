// src/services/products.service.ts
import { api } from "@/lib/api";
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types/products.types";

export const productsService = {
  async list() {
    const { data } = await api.get<Product[]>("/products");
    return data;
  },

  async create(payload: CreateProductRequest) {
    const { data } = await api.post<Product>("/products", payload);
    return data;
  },

  async update(id: number | string, payload: UpdateProductRequest) {
    const { data } = await api.put<Product>(`/products/${id}`, payload);
    return data;
  },

  async remove(id: number | string) {
    await api.delete(`/products/${id}`);
  },

  async getById(id: number) {
    // se sua API não tiver GET /products/:id
    const all = await this.list();
    const found = all.find((p) => p.id === id);
    if (!found) throw new Error("Product not found");
    return found;
  },
};
