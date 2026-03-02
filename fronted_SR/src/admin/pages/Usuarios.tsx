import { useEffect, useState } from "react";
import api from "../../services/api";
import type { User } from "../../types/User";
import TablaCiudadanos from "../components/TablaCiudadanos";
import TablaPersonal from "../components/TablaPersonal";

const Usuarios: React.FC = () => {
  const [ciudadanos, setCiudadanos] = useState<User[]>([]);
  const [personal, setPersonal] = useState<User[]>([]);
  const [tab, setTab] = useState<"ciudadanos" | "personal">("ciudadanos");

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
          onVer={(u) => console.log("ver", u)}
          onEliminar={(id) => console.log("eliminar", id)}
        />
      )}

      {tab === "personal" && (
        <TablaPersonal
          usuarios={personal}
          onCrear={() => console.log("crear")}
          onVer={(u) => console.log("ver", u)}
          onEditar={(u) => console.log("editar", u)}
          onEliminar={(id) => console.log("eliminar", id)}
        />
      )}
    </div>
  );
};

export default Usuarios;