export interface Variant {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  details: string; // Long description
  imageUrl: string;
  variants: Variant[];
  category: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  imageUrl: string;
  variantName: string;
  price: number;
  quantity: number;
}

export enum OrderStatus {
  PENDING = '待處理',
  CONFIRMED = '已確認',
  READY = '待取貨',
  COMPLETED = '已完成',
  CANCELLED = '已取消'
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}
