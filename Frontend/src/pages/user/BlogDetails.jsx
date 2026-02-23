import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function BlogDetails() {

  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const res = await API.get(`/cms/${id}`);
    setBlog(res.data);
  };

  if (!blog) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded">

      <h1 className="text-3xl font-bold mb-4">
        {blog.title}
      </h1>

      <p className="text-gray-700 whitespace-pre-line">
        {blog.content}
      </p>

    </div>
  );
}