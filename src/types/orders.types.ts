// src/types/orders.types.ts

export interface OrderProductInput {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  products: OrderProductInput[];
  totalValue: number;
}

export interface CheckoutRequest {
  products: OrderProductInput[];
  totalValue: number;
}

export interface CheckoutResponse {
  url?: string;
  sessionId?: string;
  message?: string;
}

export interface OrderProduct {
  productId: number;
  quantity: number;
  name?: string;
  price?: number;
}

export interface Order {
  id: number;
  userId?: number;
  totalValue?: number;
  createdAt?: string;
  products: OrderProduct[];
}
