import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved users
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    setIsLoaded(true);
  }, []);

  // Save users
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users, isLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name.trim() === "" || form.email.trim() === "") return;
    const newUser = { id: Date.now(), name: form.name, email: form.email };
    setUsers([...users, newUser]);
    setForm({ name: "", email: "" });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  // 🧩 Views
  const EmptyView = () => (
    <div className="empty-view">
      <h2>No users yet 😴</h2>
      <p>Add someone to get started.</p>
    </div>
  );

  const UserListView = () => (
    <div className="user-list">
      <h2>All Users ({users.length})</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <strong>{u.name}</strong> — {u.email}
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="App">
      <h1>Lesson 19: Conditional Rendering</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>

      {/* 🧠 Conditional Rendering happens here */}
      {users.length === 0 ? <EmptyView /> : <UserListView />}
    </div>
  );
}

export default App;
