import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Swal from "sweetalert2";

interface Rol {
  id_rol: number;
  nombre: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  roles: Rol[];
  created_at: string;
}

const VerUsuario: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    cargarUsuario();
  }, [id]);

  const cargarUsuario = async () => {
    try {
      const res = await api.get(`/users/${id}`);
      setUser(res.data);
    } catch (error) {
      console.error("Error cargando usuario", error);

      Swal.fire({
        title: "Error",
        text: "No se pudo cargar el usuario.",
        icon: "error",
      });

      navigate("/admin/usuarios");
    }
  };

  if (!user) return <p>Cargando...</p>;

    return (
    <div className="admin-content">
        <div className="ver-user-card-dark">

        <div className="ver-user-header-dark">
            <h2>Detalle del Usuario</h2>
            <span className="user-id-dark">ID: {user.id}</span>
        </div>

        <div className="ver-user-body-dark">

            <div className="user-row">
            <span className="label-dark">Nombre</span>
            <span className="value-dark">{user.name}</span>
            </div>

            <div className="user-row">
            <span className="label-dark">Correo</span>
            <span className="value-dark">{user.email}</span>
            </div>

            <div className="user-row">
            <span className="label-dark">Rol</span>
            <div className="roles-dark">
                {user.roles.map((r) => (
                <span key={r.id_rol} className="badge-dark">
                    {r.nombre}
                </span>
                ))}
            </div>
            </div>

            <div className="user-row">
            <span className="label-dark">Fecha Registro</span>
            <span className="value-dark">
                {new Date(user.created_at).toLocaleString()}
            </span>
            </div>

        </div>

        <div className="ver-user-footer-dark">
            <button
            className="btn-back-dark"
            onClick={() => navigate("/admin/usuarios")}
            >
            ← Volver
            </button>
        </div>

        </div>
    </div>
    );
};

export default VerUsuario;