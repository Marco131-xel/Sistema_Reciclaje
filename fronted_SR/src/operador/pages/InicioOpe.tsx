import { Link } from "react-router-dom";

function InicioOpe() {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="coord-dashboard">

      {/* Header */}
      <div className="dashboard-headerCoord">
        <h2>Panel del Operador</h2>

        <p>
          Bienvenido, <strong>{user?.name || "Operador"}</strong>.  
          Gestiona el reciclaje, controla los contenedores y atiende solicitudes ciudadanas.
        </p>
      </div>

      {/* Cards */}
      <div className="row g-4">

        <DashboardCard
          icon="bi-recycle"
          title="Registro Reciclaje"
          text="Registra los materiales reciclados recolectados."
          to="/ope/registro"
        />

        <DashboardCard
          icon="bi-trash2-fill"
          title="Control Contenedor"
          text="Verifica el nivel de llenado de los contenedores."
          to="/ope/control"
        />

        <DashboardCard
          icon="bi-file-earmark-text"
          title="Solicitudes"
          text="Gestiona solicitudes de recolección ciudadana."
          to="/ope/solicitud"
        />

        <DashboardCard
          icon="bi-people-fill"
          title="Atención"
          text="Atiende reportes y consultas de la comunidad."
          to="/ope/atencion"
        />

        <DashboardCard
          icon="bi-person-circle"
          title="Perfil"
          text="Consulta y actualiza tu información personal."
          to={`/ope/perfil/${user?.id}`}
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

export default InicioOpe;