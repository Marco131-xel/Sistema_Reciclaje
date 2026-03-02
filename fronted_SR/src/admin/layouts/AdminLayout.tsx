import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../style/admin.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="admin-body">
        <Sidebar open={sidebarOpen} />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AdminLayout;