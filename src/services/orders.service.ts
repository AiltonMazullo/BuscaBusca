import { api } from "@/lib/api";
import type {
  Order,
  CreateOrderRequest,
  CreateOrderResponse,
} from "@/types/orders.types";

export const ordersService = {
  async listMyOrders() {
    const { data } = await api.get<Order[] | Order>("/orders");
    return Array.isArray(data) ? data : [data];
  },

  async create(payload: CreateOrderRequest) {
    const { data } = await api.post<CreateOrderResponse>("/orders", payload);
    return data;
  },
};
