import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AdminDashboard() {

  const [data, setData] = useState({
    stats: {},
    recentCMS: []
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await API.get("/reports/dashboard");
    setData(res.data);
  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h2>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mb-8">

        <Card title="Total CMS" value={data.stats.totalCMS} />
        <Card title="Total Users" value={data.stats.totalUsers} />
        <Card title="Drafts" value={data.stats.totalDrafts} />
        <Card title="System Status" value="Active" />

      </div>

      {/* RECENT CMS */}
      <div className="bg-white p-6 rounded shadow">

        <h3 className="font-semibold mb-4">
          Recent CMS Entries
        </h3>

        {data.recentCMS?.map(cms => (
          <div key={cms._id}
            className="border-b py-3 flex justify-between">

            <span>{cms.title}</span>
            <span className="text-gray-500">
              {cms.author?.firstName}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value || 0}</h3>
    </div>
  );
}