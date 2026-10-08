import { useState, useEffect } from "react";
import UserModal from "./UserModal.jsx";
import RoleSelect from "./RoleSelect.jsx";
import UserTable from "./UserTable.jsx";

const STORAGE_KEY = "user-table-data-v3";

const SEED_USERS = [
  ["Maanas Agarwal", "Admin"], ["Aarav Mehta", "Admin"], ["Priya Nair", "Editor"],
  ["Rohan Desai", "Viewer"], ["Sneha Kulkarni", "Viewer"], ["Vikram Shah", "Manager"],
  ["Ananya Iyer", "Developer"], ["Karan Joshi", "Designer"], ["Meera Patil", "Support"],
  ["Dev Malhotra", "Viewer"],
].map(([name, role], i) => ({
  id: i + 1,
  name,
  role,
  email: i === 0 ? "agarwalmaanas@gmail.com" : `${name.split(" ")[0].toLowerCase()}@google.com`,
}));

function loadUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // fall back to seed data
  }
  return SEED_USERS;
}

export default function App() {
  const [users, setUsers] = useState(loadUsers);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All");
  const [modalUser, setModalUser] = useState(null); // null closed, {} add, {id,...} edit

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      // storage unavailable
    }
  }, [users]);

  const saveUser = (user) => {
    setUsers(
      user.id
        ? users.map((u) => (u.id === user.id ? user : u))
        : [...users, { ...user, id: Date.now() }]
    );
    setModalUser(null);
  };

  const deleteUser = (user) => {
    if (window.confirm(`Delete ${user.name}?`)) {
      setUsers(users.filter((u) => u.id !== user.id));
    }
  };

  const countFor = (r) => (r === "All" ? users.length : users.filter((u) => u.role === r).length);

  const term = query.trim().toLowerCase();
  const visibleUsers = users.filter(
    (u) =>
      (role === "All" || u.role === role) &&
      (!term || [u.name, u.email, u.role].some((v) => v.toLowerCase().includes(term)))
  );

  return (
    <main>
      <h1>User Data Table</h1>

      <section className="panel controls">
        <div className="top">
          <h2>Find or add a user</h2>
          <button className="primary" onClick={() => setModalUser({})}>
            + Add user
          </button>
        </div>

        <div>
          <label className="t">Search</label>
          <div className="searchbox">
            <span className="ico">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search users by name, email or role…"
              aria-label="Search users"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="clear" aria-label="Clear search" onClick={() => setQuery("")}>
                ×
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="t">Filter by role</label>
          <RoleSelect value={role} onChange={setRole} count={countFor} />
        </div>
      </section>

      <p className="meta">
        Showing {visibleUsers.length} of {users.length}
        {role !== "All" ? ` · role: ${role}` : " · all roles"}
      </p>

      <UserTable users={visibleUsers} onEdit={setModalUser} onDelete={deleteUser} />

      {modalUser && (
        <UserModal user={modalUser} onSave={saveUser} onClose={() => setModalUser(null)} />
      )}
    </main>
  );
}
