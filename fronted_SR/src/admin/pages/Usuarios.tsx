import { useEffect, useState } from "react";
import api from "../../services/api";
import type { User } from "../../types/User";
import TablaCiudadanos from "../components/TablaCiudadanos";
import TablaPersonal from "../components/TablaPersonal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Usuarios: React.FC = () => {
  const [ciudadanos, setCiudadanos] = useState<User[]>([]);
  const [personal, setPersonal] = useState<User[]>([]);
  const [tab, setTab] = useState<"ciudadanos" | "personal">("ciudadanos");
  const navigate = useNavigate();

const eliminarUsuario = async (id: number) => {
  const result = await Swal.fire({
    title: "¿Eliminar usuario?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    background: "#111",
    color: "#fff"
  });

  if (!result.isConfirmed) return;

  try {
    await api.delete(`/users/${id}`);

    await Swal.fire({
      title: "Eliminado",
      text: "El usuario fue eliminado correctamente.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      confirmButtonColor: "#1abc9c",
      background: "#111",
      color: "#fff"
    });

    await cargar();

  } catch (error) {
    console.error("Error eliminando usuario", error);

    Swal.fire({
      title: "Error",
      text: "No se pudo eliminar el usuario.",
      icon: "error",
      confirmButtonColor: "#e74c3c",
      background: "#111",
      color: "#fff"
    });
  }
};


  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const [c, p] = await Promise.all([
      api.get<User[]>("/usuarios/ciudadanos"),
      api.get<User[]>("/usuarios/personal"),
    ]);
    setCiudadanos(c.data);
    setPersonal(p.data);
  };

  return (
    <div className="admin-content">
      <h1>Gestión de Usuarios</h1>

      <div style={{ marginBottom: 15 }}>
        <button className="btn btn-create" onClick={() => setTab("ciudadanos")}>
          Ciudadanos
        </button>
        <button className="btn btn-create" onClick={() => setTab("personal")}>
          Personal
        </button>
      </div>

      {tab === "ciudadanos" && (
        <TablaCiudadanos
          usuarios={ciudadanos}
          onVer={(u) => navigate(`ver/${u.id}`)}
          onEliminar={eliminarUsuario}
        />
      )}

      {tab === "personal" && (
        <TablaPersonal
          usuarios={personal}
          onCrear={() => navigate("crear")}
          onVer={(u) => navigate(`ver/${u.id}`)}
          onEditar={(u) => navigate(`editar/${u.id}`)}
          onEliminar={eliminarUsuario}
        />
      )}
    </div>
  );
};

export default Usuarios;