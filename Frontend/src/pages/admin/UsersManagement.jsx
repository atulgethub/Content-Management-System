import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", role: "" });

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditing(user._id);
    setForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role });
  };

  const handleUpdate = async (id) => {
    await API.put(`/users/${id}`, form);
    setEditing(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await API.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users Management</h2>

      <div className="space-y-4">
        {users.map(user => (
          <div key={user._id} className="bg-white p-4 rounded shadow">
            {editing === user._id ? (
              <>
                <input
                  className="border p-2 mb-2 w-full"
                  value={form.firstName}
                  onChange={e => setForm({ ...form, firstName: e.target.value })}
                />
                <input
                  className="border p-2 mb-2 w-full"
                  value={form.lastName}
                  onChange={e => setForm({ ...form, lastName: e.target.value })}
                />
                <input
                  className="border p-2 mb-2 w-full"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <select
                  className="border p-2 mb-2 w-full"
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button className="bg-green-600 text-white px-4 py-1 mr-2 rounded" onClick={() => handleUpdate(user._id)}>Save</button>
                <button className="bg-gray-500 text-white px-4 py-1 rounded" onClick={() => setEditing(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <div className="mt-2 space-x-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(user._id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}