import { Link } from "react-router-dom";

function Header() {
    const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
    };
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <Link className="navbar-brand fw-bold" to="/admin">
        Sistema Municipal 3R
        </Link>

        <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
            <Link className="nav-link" to="#">
                Inicio
            </Link>
            </li>

            <li className="nav-item">
            <Link className="nav-link" to="/admin/carrito">
                Usuarios
            </Link>
            </li>

            <li className="nav-item">
            <Link className="nav-link" to="/admin/perfil">
                <button onClick={handleLogout}>Cerrar sesion</button>
            </Link>
            </li>

            <li className="nav-item text-white fw-bold">
                USUARIO
            </li>
        </ul>
        </div>
    </nav>
    );
}

export default Header;