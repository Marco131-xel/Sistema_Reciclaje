import Header from "../components/Header";
import Footer from "../components/Footer";
import type { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode
}

function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container my-4 flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default AdminLayout;