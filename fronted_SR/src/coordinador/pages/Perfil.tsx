import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Swal from "sweetalert2";
import type { User } from "../../types/User";

const Perfil: React.FC = () => {
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
            console.error("Error cargando perfil", error);
            Swal.fire({
                title: "Error",
                text: "No se pudieron cargar los datos del perfil",
                icon: "error",
                confirmButtonColor: "#e74c3c",
                background: "#111",
                color: "#fff"
            });

            navigate("/coord")
        }
    };

    if(!user) return <p>Cargando...</p>;

    return (
        <div className="perfil-content">
            <div className="perfil-card">
                <div className="perfil-header">
                    <h2>Perfil Usuario</h2>
                </div>

                <div className="perfil-body">

                    <div className="perfil-row">
                        <span className="perfil-label">Nombre</span>
                        <span className="perfil-value">{user.name}</span>
                    </div>

                    <div className="perfil-row">
                        <span className="perfil-label">Correo</span>
                        <span className="perfil-value">{user.email}</span>
                    </div>

                    <div className="perfil-row">
                        <span className="perfil-label">Rol</span>
                        <div className="perfil-roles">
                            {user.roles.map((r) => (
                            <span key={r.id_rol} className="perfil-badge">
                                {r.nombre}
                            </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="perfil-footer">
                    <button className="perfil-btn-back"
                    onClick={() => navigate(-1)}>
                        Volver
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Perfil;