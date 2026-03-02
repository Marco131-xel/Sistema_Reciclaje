import { Link } from "react-router-dom";

function Inicio() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="admin-dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <h2>Panel de Administración</h2>
        <p>
          Bienvenido, <strong>{user?.name || "Administrador"}</strong>.  
          Gestiona el sistema municipal desde este panel.
        </p>
      </div>

      {/* Cards */}
      <div className="row g-4">

        <DashboardCard
          icon="bi-shield-check"
          title="Auditar Actividades"
          text="Monitorea eventos, accesos y acciones del sistema."
          to="#"
        />

        <DashboardCard
          icon="bi-bar-chart-line"
          title="Reportes Estratégicos"
          text="Genera análisis e informes municipales."
          to="#"
        />

        <DashboardCard
          icon="bi-gear"
          title="Configurar Sistema"
          text="Parámetros, ajustes y configuración general."
          to="#"
        />

        <DashboardCard
          icon="bi-person-plus"
          title="Asignar Roles"
          text="Asigna roles y privilegios a usuarios."
          to="#"
        />

        <DashboardCard
          icon="bi-people"
          title="Gestionar Usuarios"
          text="Administra usuarios, accesos y estados."
          to="#"
        />

      </div>
    </div>
  );
}

interface CardProps {
  icon: string;
  title: string;
  text: string;
  to: string;
}

function DashboardCard({ icon, title, text, to }: CardProps) {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <Link to={to} className="dashboard-card">
        <div className="card-body d-flex gap-3 align-items-center">
          <span className="icon-badge">
            <i className={`bi ${icon}`}></i>
          </span>
          <div>
            <h5>{title}</h5>
            <p>{text}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Inicio;