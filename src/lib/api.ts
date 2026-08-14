// // Thin fetch wrapper. Right now nothing calls this — feature pages import
// // directly from `@/data/mockData`. When the FastAPI backend is ready, add
// // functions here (getOrders, getInventory, placeOrder, ...) and swap the
// // imports in each feature's page component from `@/data/mockData` to
// // `@/lib/api`. The mock data's shape already matches what these should return.

// const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

// async function request<T>(path: string, init?: RequestInit): Promise<T> {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     headers: { "Content-Type": "application/json" },
//     ...init,
//   });
//   if (!res.ok) {
//     throw new Error(`API error ${res.status}: ${await res.text()}`);
//   }
//   return res.json() as Promise<T>;
// }

// export const api = {
//   // Example shape once the backend exists:
//   // getOrders: () => request<OrderRecord[]>("/orders"),
//   // getInventory: () => request<InventoryBatch[]>("/inventory"),
//   // updateOrderStatus: (id: string, status: OrderStatus) =>
//   //   request<OrderRecord>(`/orders/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
//   //
//   // RoutesPage manages routes as local state today (see nextRouteId there for
//   // the id-generation logic that a real backend should take over). Once ready:
//   // getRoutes: () => request<RouteInfo[]>("/routes"),
//   // createRoute: (route: Omit<RouteInfo, "id" | "retailers" | "pending">) =>
//   //   request<RouteInfo>("/routes", { method: "POST", body: JSON.stringify(route) }),
//   // deleteRoute: (id: string) => request<void>(`/routes/${id}`, { method: "DELETE" }),
// };
