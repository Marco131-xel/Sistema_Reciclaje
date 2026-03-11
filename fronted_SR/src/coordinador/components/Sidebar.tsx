import { NavLink } from "react-router-dom";

interface Props {
  open: boolean;
}

function Sidebar({ open }: Props) {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <aside className={`coord-sidebar ${open ? "open" : ""}`}>
      <ul className="sidebar-menu-coord">
        <li>
          <NavLink to="/coord" end>
            <i className="bi bi-house"></i> Inicio
          </NavLink>
        </li>

        <li>
          <NavLink to="/coord/rutas">
            <i className="bi bi-sign-turn-right"></i> Rutas
          </NavLink>
        </li>

        <li>
          <NavLink to="/coord/camiones">
            <i className="bi bi-truck"></i> Camiones
          </NavLink>
        </li>

        <li>
          <NavLink to="/coord/monitoreo">
            <i className="bi bi-display"></i> Monitoreo
          </NavLink>
        </li>

        <li>
          <NavLink to="/coord/incidencias">
            <i className="bi-exclamation-triangle"></i> Incidencias
          </NavLink>
        </li>
        <li>
          <NavLink to="/coord/reportes">
            <i className="bi bi-bar-chart-line"></i> Reportes
          </NavLink>
        </li>

        <li className="sidebar-divider-coord"></li>

        <li>
          <NavLink to={`/coord/perfil/${user?.id}`}>
            <i className="bi bi-person-circle"></i> Perfil
          </NavLink>
        </li>

        <li>
          <button onClick={handleLogout} className="sidebar-logout-coord">
            <i className="bi bi-box-arrow-right"></i> Cerrar sesión
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;