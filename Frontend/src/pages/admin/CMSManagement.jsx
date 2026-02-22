import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function CMSManagement() {
  const [cms, setCms] = useState([]);

  const fetchCMS = async () => {
    const res = await API.get("/cms");
    setCms(res.data);
  };

  useEffect(() => {
    fetchCMS();
  }, []);

  const changeStatus = async (id, status) => {
    await API.put(`/cms/${id}`, { status });
    fetchCMS();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">CMS Management</h2>
      <div className="bg-white p-6 rounded shadow">
        {cms.map((c) => (
          <div key={c._id} className="border p-3 rounded mb-2 flex justify-between">
            <div>
              <h3 className="font-semibold">{c.title}</h3>
              <p className="text-gray-500 text-sm">{c.author?.firstName}</p>
              <p className="text-gray-400 text-sm">Status: {c.status}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => changeStatus(c._id, "published")}
                className="text-green-600"
              >
                Publish
              </button>
              <button
                onClick={() => changeStatus(c._id, "draft")}
                className="text-yellow-600"
              >
                Draft
              </button>
              <button
                onClick={() => changeStatus(c._id, "archived")}
                className="text-red-600"
              >
                Archive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}