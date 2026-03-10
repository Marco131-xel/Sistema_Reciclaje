import { Link } from "react-router-dom";

function InicioCoord() {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="coord-dashboard">

      {/* Header */}
      <div className="dashboard-headerCoord">
        <h2>Panel del Coordinador</h2>

        <p>
          Bienvenido, <strong>{user?.name || "Coordinador"}</strong>.  
          Administra las rutas de recolección y supervisa la operación diaria.
        </p>
      </div>

      {/* Cards */}
      <div className="row g-4">

        <DashboardCard
          icon="bi-sign-turn-right"
          title="Planificación de Rutas"
          text="Crea y administra rutas de recolección por zona."
          to="/coord/rutas"
        />

        <DashboardCard
          icon="bi-truck"
          title="Asignar Camiones"
          text="Asigna camiones y conductores a las rutas."
          to="/coord/camiones"
        />

        <DashboardCard
          icon="bi-display"
          title="Monitoreo en Tiempo Real"
          text="Supervisa el avance de los camiones en el mapa."
          to="/coord/monitoreo"
        />

        <DashboardCard
          icon="bi-exclamation-triangle"
          title="Incidencias"
          text="Gestiona problemas reportados durante la recolección."
          to="/coord/incidencias"
        />

        <DashboardCard
          icon="bi-bar-chart-line"
          title="Reportes Operativos"
          text="Consulta estadísticas y reportes de recolección."
          to="/coord/reportes"
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
      <Link to={to} className="dashboard-cardCoord">

        <div className="card-body d-flex gap-3 align-items-center">

          <span className="icon-badgeCoord">
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

export default InicioCoord;