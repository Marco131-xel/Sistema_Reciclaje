import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./f.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/users", form);

      setMessage("Usuario creado");
      setErrors([]);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error: any) {
      if (error.response?.data?.errors) {
        const backendErrors = Object.values(error.response.data.errors).flat();
        setErrors(backendErrors as string[]);
      } else {
        setErrors(["Error al crear usuario"]);
      }
    }
  };

  return (
    <div className="register-wrapper">
      <div className="card register-card">
        <div className="row g-0">

          {/* Panel izquierdo */}
          <div className="col-md-6 left-side d-flex flex-column justify-content-center align-items-center p-5">
            <h4 className="mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-leaf-fill" viewBox="0 0 16 16">
                <path d="M1.4 1.7c.217.289.65.84 1.725 1.274 1.093.44 2.885.774 5.834.528 2.02-.168 3.431.51 4.326 1.556C14.161 6.082 14.5 7.41 14.5 8.5q0 .344-.027.734C13.387 8.252 11.877 7.76 10.39 7.5c-2.016-.288-4.188-.445-5.59-2.045-.142-.162-.402-.102-.379.112.108.985 1.104 1.82 1.844 2.308 2.37 1.566 5.772-.118 7.6 3.071.505.8 1.374 2.7 1.75 4.292.07.298-.066.611-.354.715a.7.7 0 0 1-.161.042 1 1 0 0 1-1.08-.794c-.13-.97-.396-1.913-.868-2.77C12.173 13.386 10.565 14 8 14c-1.854 0-3.32-.544-4.45-1.435-1.124-.887-1.889-2.095-2.39-3.383-1-2.562-1-5.536-.65-7.28L.73.806z"/>
                </svg>
                Sistema Municipal 3R
            </h4>
            <p className="small mb-4 text-center">
              Únete al sistema municipal de gestión de residuos y reciclaje.
            </p>
            <img
              src="/images/icono.png"
              alt="Sistema 3R"
              className="img-fluid"
              style={{ maxWidth: "200px" }}
            />
          </div>

          {/* Panel derecho */}
          <div className="col-md-6 p-5 bg-white">
            <div className="text-center mb-4">
              <h3 className="fw-bold">Crear Cuenta</h3>
              <p className="text-muted">
                Regístrate para acceder al sistema
              </p>
            </div>

            {errors.length > 0 && (
              <div className="alert alert-danger">
                <ul className="mb-0">
                  {errors.map((err, index) => (
                    <li key={index}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {message && (
              <div className="alert alert-success">{message}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-person"></i> Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Nombre completo"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-envelope"></i> Correo
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="ejemplo@correo.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-lock"></i> Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-register w-100 text-white py-2"
              >
                <i className="bi bi-person-plus"></i> Registrarse
              </button>

              <div className="text-center mt-3">
                <p className="footer-text">
                  ¿Ya tienes una cuenta?{" "}
                  <a href="/" className="custom-link">
                    Inicia sesión
                  </a>
                </p>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;