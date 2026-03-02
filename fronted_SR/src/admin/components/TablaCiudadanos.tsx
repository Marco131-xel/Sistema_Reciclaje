import type { User } from "../../types/User";

interface Props {
  usuarios: User[];
  onVer: (user: User) => void;
  onEliminar: (id: number) => void;
}

const TablaCiudadanos: React.FC<Props> = ({ usuarios, onVer, onEliminar }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <div className="admin-actions">
                <button className="btn btn-view" onClick={() => onVer(user)}>
                  <i className="bi bi-eye"></i> Ver
                </button>
                <button className="btn btn-delete" onClick={() => onEliminar(user.id)}>
                  <i className="bi bi-trash3-fill"></i> Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaCiudadanos;