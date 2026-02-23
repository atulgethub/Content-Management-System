import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/cms");
      // Only show published blogs
      setBlogs(res.data.filter(blog => blog.status === "Published"));
    } catch (err) {
      console.error("FETCH BLOGS ERROR:", err);
    }
  };

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {blogs.map(blog => (
        <div
          key={blog._id}
          onClick={() => navigate(`/user/blog/${blog._id}`)}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-lg font-bold">{blog.title}</h2>
          <p className="text-gray-500 mt-2">{blog.content?.substring(0, 100)}...</p>
          <p className="text-gray-400 mt-1 text-sm">
            By: {blog.author?.firstName} {blog.author?.lastName}
          </p>
        </div>
      ))}
    </div>
  );
}