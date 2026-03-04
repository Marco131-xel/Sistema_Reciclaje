import { NavLink } from "react-router-dom";

interface Props {
  open: boolean;
}

function Sidebar({ open }: Props) {
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ban" viewBox="0 0 16 16">
              <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
            </svg> Incidencias
          </NavLink>
        </li>
        <li>
          <NavLink to="/coord/reportes">
            <i className="bi bi-bar-chart-line"></i> Reportes
          </NavLink>
        </li>

        <li className="sidebar-divider-coord"></li>

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