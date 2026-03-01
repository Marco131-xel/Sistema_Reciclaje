import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import type { ReactNode } from "react";
import "../style/admin.css"

interface Props {
  children: ReactNode;
}

function AdminLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="admin-body">
        <Sidebar open={sidebarOpen} />

        <main className="admin-content">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AdminLayout;