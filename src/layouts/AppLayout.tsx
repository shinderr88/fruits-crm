import { Outlet } from "react-router-dom";
import Sidebar from "@/app/Sidebar";
import Topbar from "@/app/Topbar";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-bg text-text font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
