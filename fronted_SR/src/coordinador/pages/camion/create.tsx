import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Swal from "sweetalert2";
import "./camion.css";

function CrearCamion() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    placa: "",
    capacidad_ton: "",
    estado: "",
    conductor: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const limpiarFormulario = () => {
    setForm({
      placa: "",
      capacidad_ton: "",
      estado: "",
      conductor: ""
    });
  };

  const guardarCamion = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      setLoading(true);

      await api.post("/camiones", form);

      await Swal.fire({
        title: "Camión creado",
        text: "El camión fue registrado correctamente.",
        icon: "success",
        confirmButtonColor: "#1abc9c",
        background: "#051F20",
        color: "#fff"
      });

      limpiarFormulario();

      navigate("/coord/camiones");

    } catch (error: any) {

      console.error("Error creando camión", error);

      Swal.fire({
        title: "Error",
        text:
          error?.response?.data?.message ||
          "No se pudo crear el camión.",
        icon: "error",
        confirmButtonColor: "#e74c3c",
        background: "#051F20",
        color: "#fff"
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="camion-crear-page">

      <div className="camion-crear-container">

        <h2 className="camion-crear-title">
          <i className="bi bi-truck"></i> Crear Camión
        </h2>

        <form onSubmit={guardarCamion} className="camion-crear-form">

          <div className="camion-crear-group">
            <label>Placa</label>
            <input
              type="text"
              name="placa"
              className="camion-crear-input"
              value={form.placa}
              onChange={handleChange}
              required
            />
          </div>

          <div className="camion-crear-group">
            <label>Capacidad (Toneladas)</label>
            <input
              type="number"
              name="capacidad_ton"
              className="camion-crear-input"
              value={form.capacidad_ton}
              onChange={handleChange}
              required
            />
          </div>

          <div className="camion-crear-group">
            <label>Estado</label>
            <select
              name="estado"
              className="camion-crear-select"
              value={form.estado}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="activo">Activo</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div className="camion-crear-group">
            <label>Conductor</label>
            <input
              type="text"
              name="conductor"
              className="camion-crear-input"
              value={form.conductor}
              onChange={handleChange}
            />
          </div>

          <div className="camion-crear-buttons">

            <button
              type="submit"
              className="camion-crear-btn-guardar"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>

            <button
              type="button"
              className="camion-crear-btn-cancelar"
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

export default CrearCamion;