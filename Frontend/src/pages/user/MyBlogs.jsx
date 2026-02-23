import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function MyBlogs() {

  const { API, user } = useContext(AuthContext);

  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= FETCH BLOGS ================= */
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/cms");
      setBlogs(res.data);
    } catch (err) {
      console.log("Fetch Blog Error:", err.response?.data || err.message);
    }
  };

  /* ================= CREATE BLOG ================= */
  const createBlog = async () => {

    if (!title.trim() || !content.trim()) {
      return alert("Title and content required");
    }

    try {
      setLoading(true);

      const res = await API.post("/cms", {
        title,
        content,
      });

      console.log("Created:", res.data);

      setTitle("");
      setContent("");

      fetchBlogs();

      alert("Blog Created ✅");

    } catch (err) {
      console.log("CREATE BLOG ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        {user?.role === "admin" ? "All Blogs" : "My Blogs"}
      </h2>

      {/* CREATE BLOG CARD */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h3 className="font-semibold mb-4 text-lg">
          Create New Blog
        </h3>

        <input
          placeholder="Blog Title"
          className="w-full border p-3 rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Blog Content"
          className="w-full border p-3 rounded mb-4"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={createBlog}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>

      </div>

      {/* BLOG LIST */}
      <div className="grid md:grid-cols-2 gap-6">

        {blogs.length === 0 && (
          <p className="text-gray-500">No blogs found.</p>
        )}

        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">
              {blog.title}
            </h3>

            <p className="text-gray-600 mt-3 line-clamp-3">
              {blog.content}
            </p>

            <div className="flex justify-between mt-4 text-sm text-gray-400">
              <span>Status: {blog.status}</span>
              <span>
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}