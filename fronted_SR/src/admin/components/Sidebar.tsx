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
    <aside className={`admin-sidebar ${open ? "open" : ""}`}>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin" end>
            <i className="bi bi-house"></i> Inicio
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/auditar">
            <i className="bi bi-shield-check"></i> Auditar
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/reportes">
            <i className="bi bi-bar-chart-line"></i> Reportes
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/configurar">
            <i className="bi bi-gear"></i> Configurar sistema
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/usuarios">
            <i className="bi bi-people"></i> Gestionar usuarios
          </NavLink>
        </li>

        <li className="sidebar-divider"></li>

        <li>
          <button onClick={handleLogout} className="sidebar-logout">
            <i className="bi bi-box-arrow-right"></i> Cerrar sesión
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;