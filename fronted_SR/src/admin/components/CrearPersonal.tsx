import { useEffect, useState } from "react";
import api from "../../services/api";

interface Rol {
  id_rol: number;
  nombre: string;
}

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const CrearPersonal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rol_id: "",
  });

  useEffect(() => {
    cargarRoles();
  }, []);

  const cargarRoles = async () => {
    const res = await api.get<Rol[]>("/roles/personal");
    setRoles(res.data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post("/usuarios/personal", {
      ...form,
      rol_id: Number(form.rol_id),
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Crear Usuario Personal</h2>

        <form onSubmit={handleSubmit} className="form">
          <input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Correo"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            placeholder="Contraseña"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <select
            name="rol_id"
            value={form.rol_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione rol</option>
            {roles.map((r) => (
              <option key={r.id_rol} value={r.id_rol}>
                {r.nombre}
              </option>
            ))}
          </select>

          <div className="modal-actions">
            <button type="submit" className="btn btn-create">
              Guardar
            </button>
            <button type="button" className="btn btn-delete" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearPersonal;