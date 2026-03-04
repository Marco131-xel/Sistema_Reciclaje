import { Link } from "react-router-dom";

interface Props {
  toggleSidebar: () => void;
}

function Header({ toggleSidebar }: Props) {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="coord-header d-flex align-items-center justify-content-between px-3">
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-menu-coord" onClick={toggleSidebar}>
          <i className="bi bi-list"></i>
        </button>

        <Link to="/coord" className="navbar-brand text-white fw-bold">
          Sistema Municipal 3R
        </Link>
      </div>

      <div className="d-flex align-items-center gap-3">
        <span className="coord-user">{user?.name || "USUARIO"} <i className="bi bi-person-circle"></i></span>
      </div>
    </header>
  );
}

export default Header;