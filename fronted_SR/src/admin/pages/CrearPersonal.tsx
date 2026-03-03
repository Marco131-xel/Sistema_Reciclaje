import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../services/api";

interface Rol {
  id_rol: number;
  nombre: string;
}

const CrearPersonal: React.FC = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState<Rol[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rol_id: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarRoles();
  }, []);

  const cargarRoles = async () => {
    try {
      const res = await api.get("/roles/personal");
      setRoles(res.data);
    } catch (error) {
      console.error("Error cargando roles", error);
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los roles.",
        icon: "error",
        confirmButtonColor: "#e74c3c",
        background: "#111",
        color: "#fff"
      });
    }
  };

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
      name: "",
      email: "",
      password: "",
      rol_id: ""
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/usuarios/personal", {
        ...form,
        rol_id: Number(form.rol_id)
      });

      await Swal.fire({
        title: "Usuario creado",
        text: "El usuario personal fue registrado correctamente.",
        icon: "success",
        confirmButtonColor: "#1abc9c",
        background: "#111",
        color: "#fff"
      });

      limpiarFormulario();
      navigate("/admin/usuarios");

    } catch (error: any) {
      console.error("Error creando usuario", error);

      Swal.fire({
        title: "Error",
        text:
          error?.response?.data?.message ||
          "No se pudo crear el usuario.",
        icon: "error",
        confirmButtonColor: "#e74c3c",
        background: "#111",
        color: "#fff"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-content">
      <div className="edit-user-card-dark">

        <div className="edit-user-header-dark">
          <h2>Crear Usuario Personal</h2>
        </div>

        <form onSubmit={handleSubmit} className="edit-user-form-dark">

          <div className="form-group-dark">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-dark">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-dark">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-dark">
            <label>Rol</label>
            <select
              name="rol_id"
              value={form.rol_id}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un rol</option>
              {roles.map((rol) => (
                <option key={rol.id_rol} value={rol.id_rol}>
                  {rol.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="edit-user-footer-dark">
            <button
              type="button"
              className="btn-cancel-dark"
              onClick={() => navigate("/admin/usuarios")}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn-save-dark"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default CrearPersonal;