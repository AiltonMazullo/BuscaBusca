// src/types/orders.types.ts
export interface OrderItemInput {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  products: OrderItemInput[];
}

export interface OrderItem {
  productId: number;
  quantity: number;
  // se backend retornar produto junto:
  product?: {
    id: number;
    name: string;
    description?: string;
    price: number;
    photos?: string;
  };
}

export interface Order {
  id: number;
  items?: OrderItem[];
  products?: OrderItem[]; // caso backend use "products"
  total?: number;
  status?: string;
  createdAt?: string;
}

export interface CheckoutRequest {
  products: OrderItemInput[];
}

export interface CheckoutResponse {
  url?: string;
  sessionId?: string;
}
