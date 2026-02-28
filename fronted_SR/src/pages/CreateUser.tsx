import { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/users", form);

      setMessage("Usuario creado");
      console.log(response.data);

      setForm({ name: "", email: "", password: "" });
    } catch (error: any) {
      console.error(error.response?.data);
      setMessage("Error al crear usuario");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Crear Usuario</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Guardar</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUser;