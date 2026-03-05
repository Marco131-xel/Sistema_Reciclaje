import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Swal from "sweetalert2";

interface Camion {
  placa: string;
  capacidad_ton: number;
  estado: string;
  conductor: string;
}

function EditarCamion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [camion, setCamion] = useState<Camion>({
    placa: "",
    capacidad_ton: 0,
    estado: "",
    conductor: "",
  });

  const obtenerCamion = async () => {
    try {
      const res = await api.get(`/camiones/${id}`);
      setCamion(res.data);
    } catch (error) {
      console.error("Error cargando camión", error);
    }
  };

  useEffect(() => {
    obtenerCamion();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCamion({
      ...camion,
      [e.target.name]: e.target.value,
    });
  };

  const actualizarCamion = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`/camiones/${id}`, camion);

      Swal.fire({
        icon: "success",
        title: "Camión actualizado",
        text: "Los datos se actualizaron correctamente",
        confirmButtonColor: "#3085d6",
        background: "#051F20",
        color: "#fff"
      });

      navigate("/coord/camiones");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el camión",
        background: "#051F20",
        color: "#fff"
      });
    }
  };

  return (
    <div className="editcam-container">

    <div className="editcam-box">

        <h2 className="editcam-title"> <i className="bi bi-truck"></i> Editar Camión</h2>

        <form className="editcam-form" onSubmit={actualizarCamion}>

        <div className="editcam-group">
            <label className="editcam-label">Placa</label>
            <input
            className="editcam-input"
            type="text"
            name="placa"
            value={camion.placa}
            onChange={handleChange}
            required
            />
        </div>

        <div className="editcam-group">
            <label className="editcam-label">Capacidad (Ton)</label>
            <input
            className="editcam-input"
            type="number"
            name="capacidad_ton"
            value={camion.capacidad_ton}
            onChange={handleChange}
            required
            />
        </div>

        <div className="editcam-group">
            <label className="editcam-label">Estado</label>
            <select
            className="editcam-select"
            name="estado"
            value={camion.estado}
            onChange={handleChange}
            >
            <option value="">Seleccionar</option>
            <option value="Activo">Activo</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Inactivo">Inactivo</option>
            </select>
        </div>

        <div className="editcam-group">
            <label className="editcam-label">Conductor</label>
            <input
            className="editcam-input"
            type="text"
            name="conductor"
            value={camion.conductor}
            onChange={handleChange}
            />
        </div>

        <div className="editcam-actions">

            <button type="submit" className="editcam-btn-save">
            Guardar Cambios
            </button>

            <button
            type="button"
            className="editcam-btn-cancel"
            onClick={() => navigate("/coord/camiones")}
            >
            Cancelar
            </button>

        </div>

        </form>

    </div>

    </div>
  );
}

export default EditarCamion;