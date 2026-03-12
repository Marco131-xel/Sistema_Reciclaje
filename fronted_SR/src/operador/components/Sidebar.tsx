import { NavLink } from "react-router-dom"

interface Props {
  open: boolean
}

function Sidebar({ open }: Props) {

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/login";
  }

  return (
    <aside className={`ope-sidebar ${open ? "open" : ""}`}>
      <ul className="sidebar-menu-ope">
        <li>
          <NavLink to="/ope" end>
            <i className="bi bi-house"></i> Inicio
          </NavLink>
        </li>

        <li>
          <NavLink to="/ope/registro">
            <i className="bi bi-recycle"></i> Registro Reciclaje
          </NavLink>
        </li>

        <li>
          <NavLink to="/ope/control">
            <i className="bi bi-trash2-fill"></i> Control Contenedor
          </NavLink>
        </li>

        <li>
          <NavLink to="/ope/solicitud">
            <i className="bi bi-file-earmark-text"></i> Solicitudes
          </NavLink>
        </li>

        <li>
          <NavLink to="/ope/atencion">
            <i className="bi bi-people-fill"></i> Atencion
          </NavLink>
        </li>

        <li className="sidebar-divider-ope"></li>

        <li>
          <NavLink to={`/ope/perfil/${user?.id}`}>
            <i className="bi bi-person-circle"></i> Perfil
          </NavLink>
        </li>

        <li>
          <button onClick={handleLogout} className="sidebar-logout-ope">
            <i className="bi bi-box-arrow-right"></i> Cerrar sesión
          </button>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar