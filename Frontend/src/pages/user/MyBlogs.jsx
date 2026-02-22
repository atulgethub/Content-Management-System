import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function MyBlogs() {
  const { API } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch blogs on load
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/cms");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

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

      {/* Create Blog */}
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

      {/* Blog List */}
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-600 mt-2">{blog.content}</p>
            <p className="text-sm mt-3 text-gray-400">Status: {blog.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}