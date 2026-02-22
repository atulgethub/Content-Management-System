import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await API.get("/cms");  // fetch current user's blogs
      setBlogs(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Create blog
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createBlog = async () => {
    if (!title || !content) return alert("Title and content required");
    try {
      await API.post("/cms", { title, content });
      setTitle("");
      setContent("");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Failed to create blog");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Blogs</h2>

      {/* Create Blog Card */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="font-semibold mb-4">Create New Blog</h3>

        <input
          placeholder="Blog Title"
          className="w-full border p-3 rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Blog Content"
          className="w-full border p-3 rounded mb-3"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={createBlog}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Publish Blog
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading blogs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Blog List */}
      {!loading && blogs.length === 0 && <p>No blogs found.</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-600 mt-2">{blog.content}</p>
            <p className="text-sm mt-3 text-gray-400">Status: {blog.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}