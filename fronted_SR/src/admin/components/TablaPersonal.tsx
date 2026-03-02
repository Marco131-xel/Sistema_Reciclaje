import type { User } from "../../types/User";

interface Props {
  usuarios: User[];
  onCrear: () => void;
  onVer: (user: User) => void;
  onEditar: (user: User) => void;
  onEliminar: (id: number) => void;
}

const TablaPersonal: React.FC<Props> = ({
  usuarios,
  onCrear,
  onVer,
  onEditar,
  onEliminar,
}) => {
  return (
    <>
      <button className="btn btn-create" onClick={onCrear}>
        <i className="bi bi-person-plus-fill"></i> Crear Usuario
      </button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.roles.map(r => r.nombre).join(", ")}</td>
              <td>
                <div className="admin-actions">
                  <button className="btn btn-view" onClick={() => onVer(user)}>
                    <i className="bi bi-eye"></i> Ver
                  </button>
                  <button className="btn btn-edit" onClick={() => onEditar(user)}>
                    <i className="bi bi-trash3-fill"></i> Editar
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
    </>
  );
};

export default TablaPersonal;