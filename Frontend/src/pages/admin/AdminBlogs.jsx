import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", content: "" });

  const fetchBlogs = async () => {
    const res = await API.get("/cms");
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    setEditing(blog._id);
    setForm({ title: blog.title, content: blog.content });
  };

  const handleUpdate = async (id) => {
    await API.put(`/cms/${id}`, form);
    setEditing(null);
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    await API.delete(`/cms/${id}`);
    fetchBlogs();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All CMS Blogs</h2>
      <div className="space-y-4">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">
              By: {blog.author?.firstName} {blog.author?.lastName} ({blog.author?.email})
            </p>

            {editing === blog._id ? (
              <>
                <input
                  className="border p-2 w-full mb-2"
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                />
                <textarea
                  className="border p-2 w-full mb-2"
                  rows={4}
                  value={form.content}
                  onChange={e => setForm({...form, content: e.target.value})}
                />
                <button
                  className="bg-green-600 text-white px-4 py-1 rounded mr-2"
                  onClick={() => handleUpdate(blog._id)}
                >
                  Save
                </button>
                <button className="bg-gray-500 text-white px-4 py-1 rounded" onClick={() => setEditing(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold">{blog.title}</h3>
                <p>{blog.content.substring(0, 150)}...</p>
                <div className="mt-2 space-x-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}