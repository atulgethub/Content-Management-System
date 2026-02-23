import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCMS: 0,
    totalDraft: 0,
    totalPublished: 0,
    totalArchived: 0,
    totalUsers: 0,
    recentCMS: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/cms/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch admin stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow p-6 rounded-xl text-center">
          <h2 className="font-semibold">Total CMS</h2>
          <p className="text-3xl font-bold">{stats.totalCMS}</p>
        </div>
        <div className="bg-white shadow p-6 rounded-xl text-center">
          <h2 className="font-semibold">Draft</h2>
          <p className="text-3xl font-bold">{stats.totalDraft}</p>
        </div>
        <div className="bg-white shadow p-6 rounded-xl text-center">
          <h2 className="font-semibold">Published</h2>
          <p className="text-3xl font-bold">{stats.totalPublished}</p>
        </div>
        <div className="bg-white shadow p-6 rounded-xl text-center">
          <h2 className="font-semibold">Archived</h2>
          <p className="text-3xl font-bold">{stats.totalArchived}</p>
        </div>
        <div className="bg-white shadow p-6 rounded-xl text-center">
          <h2 className="font-semibold">Total Users</h2>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Recent CMS Entries</h2>
      <div className="space-y-3">
        {stats.recentCMS.map(cms => (
          <div key={cms._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{cms.title}</h3>
            <p className="text-gray-500">
              By: {cms.author?.firstName || "Unknown"} {cms.author?.lastName || ""}
            </p>
            <p className="text-sm text-gray-400">Status: {cms.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}