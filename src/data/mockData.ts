// Every export here is what a `src/lib/api.ts` service function will eventually
// return from the FastAPI backend. Feature pages import from this file only —
// swapping mock data for real fetch calls means editing this file alone.
//
// SKU names come as { en, mr } pairs, matching what the backend sends —
// feature pages pick the right one via `localize()` based on the current
// language selection instead of hardcoding English.

import { InventoryBatch, OrderRecord, PriceRecord, RetailerRecord, RouteInfo } from "@/types";

const ALPHONSO = { en: "Alphonso Mango", mr: "हापूस आंबा" };
const KASHMIRI_APPLE = { en: "Kashmiri Apple", mr: "काश्मिरी सफरचंद" };
const NAGPUR_ORANGE = { en: "Nagpur Orange", mr: "नागपूर संत्रा" };
const THOMPSON_GRAPES = { en: "Thompson Grapes", mr: "थॉम्पसन द्राक्षे" };

export const ROUTES: RouteInfo[] = [
  {
    id: "R-01",
    name: "Shrirampur Town",
    supervisor: "Anil Kadam",
    retailers: 18,
    day: "Mon / Thu",
    pending: 6,
    stops: [
      { id: "R-01-S01", name: "Warehouse", sequence: 1, completed: true, completedAt: "07:45 AM" },
      { id: "R-01-S02", name: "Shrirampur Market", sequence: 2, completed: true, completedAt: "08:40 AM" },
      { id: "R-01-S03", name: "Station Road", sequence: 3, completed: true, completedAt: "09:25 AM" },
      { id: "R-01-S04", name: "Newasa Road", sequence: 4, completed: false },
      { id: "R-01-S05", name: "MIDC Area", sequence: 5, completed: false },
      { id: "R-01-S06", name: "Shrirampur Depot", sequence: 6, completed: false },
    ],
  },
  {
    id: "R-02",
    name: "Kolhapur Market Belt",
    supervisor: "Suresh Patil",
    retailers: 24,
    day: "Tue / Fri",
    pending: 11,
    stops: [
      { id: "R-02-S01", name: "Central Warehouse", sequence: 1, completed: true, completedAt: "06:50 AM" },
      { id: "R-02-S02", name: "Shahupuri", sequence: 2, completed: true, completedAt: "07:40 AM" },
      { id: "R-02-S03", name: "Rajarampuri", sequence: 3, completed: true, completedAt: "08:35 AM" },
      { id: "R-02-S04", name: "Tarabai Park", sequence: 4, completed: true, completedAt: "09:20 AM" },
      { id: "R-02-S05", name: "Gokul Shirgaon", sequence: 5, completed: false },
      { id: "R-02-S06", name: "Ujalaiwadi", sequence: 6, completed: false },
      { id: "R-02-S07", name: "Kolhapur Market", sequence: 7, completed: false },
      { id: "R-02-S08", name: "Destination", sequence: 8, completed: false },
    ],
  },
  {
    id: "R-03",
    name: "Sangli Rural",
    supervisor: "Meera Joshi",
    retailers: 14,
    day: "Wed / Sat",
    pending: 3,
    stops: [
      { id: "R-03-S01", name: "Warehouse", sequence: 1, completed: true, completedAt: "07:10 AM" },
      { id: "R-03-S02", name: "Sangli City", sequence: 2, completed: true, completedAt: "08:15 AM" },
      { id: "R-03-S03", name: "Vishrambag", sequence: 3, completed: false },
      { id: "R-03-S04", name: "Kupwad", sequence: 4, completed: false },
      { id: "R-03-S05", name: "Miraj Road", sequence: 5, completed: false },
      { id: "R-03-S06", name: "Destination", sequence: 6, completed: false },
    ],
  },
  {
    id: "R-04",
    name: "Satara Hill Road",
    supervisor: "Ravi Deshmukh",
    retailers: 10,
    day: "Mon / Fri",
    pending: 0,
    stops: [
      { id: "R-04-S01", name: "Warehouse", sequence: 1, completed: true, completedAt: "07:00 AM" },
      { id: "R-04-S02", name: "Satara Market", sequence: 2, completed: true, completedAt: "08:05 AM" },
      { id: "R-04-S03", name: "Powai Naka", sequence: 3, completed: true, completedAt: "08:50 AM" },
      { id: "R-04-S04", name: "Ajinkyatara", sequence: 4, completed: true, completedAt: "09:40 AM" },
      { id: "R-04-S05", name: "Destination", sequence: 5, completed: true, completedAt: "10:30 AM" },
    ],
  },
];

export const INVENTORY: InventoryBatch[] = [
  { sku: ALPHONSO, grade: "Export", batch: "B-2207", qty: 340, unit: "box", received: "Aug 01", agingDays: 3 },
  { sku: ALPHONSO, grade: "A", batch: "B-2208", qty: 610, unit: "box", received: "Aug 02", agingDays: 2 },
  { sku: KASHMIRI_APPLE, grade: "A", batch: "B-2192", qty: 220, unit: "crate", received: "Jul 29", agingDays: 6 },
  { sku: KASHMIRI_APPLE, grade: "B", batch: "B-2193", qty: 95, unit: "crate", received: "Jul 29", agingDays: 6 },
  { sku: NAGPUR_ORANGE, grade: "Export", batch: "B-2214", qty: 150, unit: "box", received: "Aug 03", agingDays: 1 },
  { sku: THOMPSON_GRAPES, grade: "A", batch: "B-2201", qty: 80, unit: "kg-crate", received: "Jul 30", agingDays: 5 },
];

export const ORDERS: OrderRecord[] = [
  { id: "ORD-3311", retailer: "Ganesh Fruit Mart", routeId: "R-01", items: 4, amount: 18400, status: "placed" },
  { id: "ORD-3310", retailer: "Om Sai Traders", routeId: "R-02", items: 7, amount: 32250, status: "confirmed" },
  { id: "ORD-3309", retailer: "Krishna Fruits", routeId: "R-02", items: 2, amount: 9600, status: "packed" },
  { id: "ORD-3308", retailer: "New Bombay Fruit Co.", routeId: "R-03", items: 5, amount: 21100, status: "dispatched" },
  { id: "ORD-3307", retailer: "Patel Super Fruits", routeId: "R-01", items: 3, amount: 12800, status: "delivered" },
  { id: "ORD-3306", retailer: "Shree Ram Traders", routeId: "R-04", items: 6, amount: 27300, status: "delivered" },
];

export const RETAILERS: RetailerRecord[] = [
  { name: "Ganesh Fruit Mart", routeId: "R-01", orders30d: 11, outstanding: 8200 },
  { name: "Om Sai Traders", routeId: "R-02", orders30d: 16, outstanding: 0 },
  { name: "Krishna Fruits", routeId: "R-02", orders30d: 9, outstanding: 4100 },
  { name: "New Bombay Fruit Co.", routeId: "R-03", orders30d: 7, outstanding: 15600 },
  { name: "Patel Super Fruits", routeId: "R-01", orders30d: 13, outstanding: 0 },
];

export const PRICING: PriceRecord[] = [
  { sku: ALPHONSO, grade: "Export", unit: "box", price: 1850, prevPrice: 1780, updated: "Today, 7:40 AM" },
  { sku: ALPHONSO, grade: "A", unit: "box", price: 1320, prevPrice: 1320, updated: "Today, 7:40 AM" },
  { sku: KASHMIRI_APPLE, grade: "A", unit: "crate", price: 2400, prevPrice: 2500, updated: "Yesterday" },
  { sku: KASHMIRI_APPLE, grade: "B", unit: "crate", price: 1950, prevPrice: 1950, updated: "Yesterday" },
  { sku: NAGPUR_ORANGE, grade: "Export", unit: "box", price: 980, prevPrice: 910, updated: "Today, 6:15 AM" },
  { sku: THOMPSON_GRAPES, grade: "A", unit: "kg-crate", price: 145, prevPrice: 160, updated: "2 days ago" },
];

export const REVENUE_TREND = [
  { label: "Wk 1", revenue: 182000 },
  { label: "Wk 2", revenue: 214000 },
  { label: "Wk 3", revenue: 198000 },
  { label: "Wk 4", revenue: 241000 },
];

export const GRADE_MIX = [
  { name: "Export", value: 28 },
  { name: "Grade A", value: 51 },
  { name: "Grade B", value: 21 },
];
