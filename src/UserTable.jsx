export default function UserTable({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return <div className="panel empty">No users match. Try a different search or role.</div>;
  }

  return (
    <div className="panel wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><span className="badge">{user.role}</span></td>
              <td className="act">
                <button onClick={() => onEdit(user)}>Edit</button>
                <button className="danger" onClick={() => onDelete(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
