import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/cms/myblogs"); // fetch only user's blogs
      setBlogs(res.data);
    } catch (err) {
      console.error("FETCH BLOGS ERROR:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const createBlog = async () => {
    if (!title.trim() || !content.trim()) return alert("Title and content required");
    try {
      await API.post("/cms", { title, content });
      setTitle("");
      setContent("");
      fetchBlogs();
    } catch (err) {
      console.error("CREATE BLOG ERROR:", err);
    }
  };

  const updateBlog = async (id) => {
    const newTitle = prompt("New title:");
    const newContent = prompt("New content:");
    if (!newTitle || !newContent) return;
    try {
      await API.put(`/cms/${id}`, { title: newTitle, content: newContent });
      fetchBlogs();
    } catch (err) {
      console.error("UPDATE BLOG ERROR:", err);
    }
  };

  const deleteBlog = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await API.delete(`/cms/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("DELETE BLOG ERROR:", err);
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">My Blogs</h2>

      {/* Create Blog */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={createBlog}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Blog
        </button>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{blog.title}</h3>
            <p>{blog.content}</p>
            <p className="text-sm text-gray-400">Status: {blog.status}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => updateBlog(blog._id)}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBlog(blog._id)}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}