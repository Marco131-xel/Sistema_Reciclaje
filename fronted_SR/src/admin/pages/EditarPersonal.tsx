import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Swal from "sweetalert2";

interface Rol {
  id_rol: number;
  nombre: string;
}

const EditarUsuario: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rol_id: ""
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [userRes, rolesRes] = await Promise.all([
        api.get(`/users/${id}`),
        api.get("/roles/personal")
      ]);

      const user = userRes.data;

      setForm({
        name: user.name,
        email: user.email,
        password: "",
        rol_id: user.roles.length ? String(user.roles[0].id_rol) : ""
      });

      setRoles(rolesRes.data);

    } catch (error) {
      console.error("Error cargando usuario", error);
      navigate("/admin/usuarios");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(`/users/${id}`, {
        name: form.name,
        email: form.email,
        rol_id: Number(form.rol_id),
        ...(form.password && { password: form.password })
      });

      await Swal.fire({
        title: "Actualizado",
        text: "El usuario fue actualizado correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        confirmButtonColor: "#1abc9c",
        background: "#111",
        color: "#fff"
      });

      navigate("/admin/usuarios");

    } catch (error) {
      console.error("Error actualizando usuario", error);

      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el usuario.",
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
        <h2>Editar Usuario</h2>
        <span className="user-id-dark">ID: {id}</span>
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
          <label>Nueva Contraseña (Opcional)</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Dejar vacío para no cambiar"
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
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </div>

      </form>

    </div>
  </div>
);
};

export default EditarUsuario;