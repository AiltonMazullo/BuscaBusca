// src/services/orders.service.ts
import { api } from "@/lib/api";
import type {
  Order,
  CreateOrderRequest,
  CheckoutRequest,
  CheckoutResponse,
} from "@/types/orders.types";

export const ordersService = {
  async listMyOrders() {
    const { data } = await api.get<Order[] | Order>("/orders");
    return Array.isArray(data) ? data : [data];
  },

  async create(payload: CreateOrderRequest) {
    const { data } = await api.post<Order>("/orders", payload);
    return data;
  },

  async checkout(payload: CheckoutRequest) {
    const { data } = await api.post<CheckoutResponse>(
      "/orders/checkout",
      payload,
    );
    return data;
  },
};
