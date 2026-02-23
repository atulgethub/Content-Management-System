import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function UserDashboard() {

  const [totalBlogs, setTotalBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const allBlogs = await API.get("/cms");
      const userBlogs = await API.get("/cms/myblogs");

      setTotalBlogs(allBlogs.data);
      setMyBlogs(userBlogs.data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        User Dashboard
      </h1>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white shadow p-6 rounded-xl">
          <h2>Total Blogs</h2>
          <p className="text-3xl font-bold">
            {totalBlogs.length}
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded-xl">
          <h2>My Blogs</h2>
          <p className="text-3xl font-bold">
            {myBlogs.length}
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded-xl">
          <h2>Latest Blog</h2>
          <p className="text-sm">
            {myBlogs[0]?.title || "No blog yet"}
          </p>
        </div>

      </div>

      {/* ================= RECENT BLOGS ================= */}
      <h2 className="text-xl font-semibold mb-4">
        My Recent Blogs
      </h2>

      {myBlogs.length === 0 ? (
        <p>No blogs created yet</p>
      ) : (
        myBlogs.slice(0, 5).map(blog => (
          <div
            key={blog._id}
            className="bg-white p-4 rounded mb-3 shadow"
          >
            {blog.title}
          </div>
        ))
      )}

    </div>
  );
}