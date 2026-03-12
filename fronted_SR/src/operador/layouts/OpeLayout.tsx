import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import "../style/ope.css"

function OpeLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="ope-layout">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="ope-body">
            <Sidebar open={sidebarOpen} />

            <main className="ope-content">
            <Outlet />
            </main>
        </div>

        <Footer />
        </div>
    );
}

export default OpeLayout;