export interface OrderProductInput {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  products: OrderProductInput[];
  totalValue: number;
}

export interface OrderProduct {
  id?: number;
  orderId?: number;
  productId: number;
  quantity: number;
  name?: string;
  price?: number;
}

export interface Order {
  id: number;
  userId?: number;
  totalValue?: number;
  status?: string;
  createdAt?: string;
  products: OrderProduct[];
}

export interface CreateOrderResponse {
  order: Order;
  checkoutUrl: string;
}
