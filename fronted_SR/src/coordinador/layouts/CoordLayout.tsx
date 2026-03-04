import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import "../style/coord.css"

function CoordLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="coord-layout">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="coord-body">
            <Sidebar open={sidebarOpen} />

            <main className="coord-content">
            <Outlet />
            </main>
        </div>

        <Footer />
        </div>
    );
}

export default CoordLayout;