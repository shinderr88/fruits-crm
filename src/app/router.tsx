import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardPage from "@/features/dashboard/DashboardPage";
import OrdersPage from "@/features/orders/OrdersPage";
import InventoryPage from "@/features/inventory/InventoryPage";
import PricingPage from "@/features/pricing/PricingPage";
import RoutesPage from "@/features/routes/RoutesPage";
import RetailersPage from "@/features/retailers/RetailersPage";
import ReportsPage from "@/features/reports/ReportsPage";
import SettingsPage from "@/features/settings/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "routes", element: <RoutesPage /> },
      { path: "retailers", element: <RetailersPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
