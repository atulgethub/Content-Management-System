import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function MyReports() {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/cms/myblogs")
      .then(res => setBlogs(res.data));
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Reports
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 shadow rounded">
          <h3>Total Blogs</h3>
          <p className="text-3xl font-bold">
            {blogs.length}
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3>Published Blogs</h3>
          <p className="text-3xl font-bold">
            {blogs.filter(b => b.status === "Published").length}
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3>Latest Blog</h3>
          <p>
            {blogs[0]?.title || "No activity"}
          </p>
        </div>

      </div>

    </div>
  );
}