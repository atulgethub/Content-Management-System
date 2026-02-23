import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/cms").then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link key={blog._id} to={`/blogs/${blog._id}`}>
            <div className="bg-white p-6 rounded shadow hover:shadow-lg">
              <h3 className="font-semibold text-xl">{blog.title}</h3>

              <p className="text-gray-600 mt-2">
                {blog.content.slice(0, 100)}...
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}