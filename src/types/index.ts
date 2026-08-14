export type Grade = "Export" | "A" | "B";

export type OrderStatus = "placed" | "confirmed" | "packed" | "dispatched" | "delivered";

export type Language = "en" | "mr";

// Product-facing text that comes from the backend in both languages —
// SKU names, category labels, anything shown to a Marathi- or English-speaking user.
export interface LocalizedText {
  en: string;
  mr: string;
}

export interface RouteStop {
  id: string;
  name: string;
  sequence: number;
  completed: boolean;
  completedAt?: string;
}

export interface RouteInfo {
  id: string;
  name: string;
  supervisor: string;
  retailers: number;
  day: string;
  pending: number;
  stops: RouteStop[];
}

export interface InventoryBatch {
  sku: LocalizedText;
  grade: Grade;
  batch: string;
  qty: number;
  unit: string;
  received: string;
  agingDays: number;
}

export interface OrderRecord {
  id: string;
  retailer: string;
  routeId: string;
  items: number;
  amount: number;
  status: OrderStatus;
}

export interface RetailerRecord {
  name: string;
  routeId: string;
  orders30d: number;
  outstanding: number;
}

export interface PriceRecord {
  sku: LocalizedText;
  grade: Grade;
  unit: string;
  price: number;
  prevPrice: number;
  updated: string;
}
