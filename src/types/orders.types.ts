// src/types/orders.types.ts

export interface OrderProductInput {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  products: OrderProductInput[];
}

export interface CheckoutRequest {
  products: OrderProductInput[];
}

export interface CheckoutResponse {
  url?: string;
  sessionId?: string;
  message?: string;
}

export interface OrderProduct {
  id?: number;
  productId: number;
  quantity: number;
  product?: {
    id: number;
    name: string;
    description: string;
    price: number;
    photos: string[];
    category?: string;
  };
}

export interface Order {
  id: number;
  userId?: number;
  products: OrderProduct[];
  createdAt?: string;
}
