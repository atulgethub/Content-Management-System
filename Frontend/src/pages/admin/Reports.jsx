import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function ReportsManagement() {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await API.get("/reports");
      setReports(res.data);
    } catch (err) {
      console.error("FETCH REPORTS ERROR:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/reports/${id}/status`, { status });
      fetchReports();
    } catch (err) {
      console.error("UPDATE REPORT STATUS ERROR:", err);
    }
  };

  const deleteReport = async (id) => {
    if (!window.confirm("Delete this report?")) return;
    try {
      await API.delete(`/reports/${id}`);
      fetchReports();
    } catch (err) {
      console.error("DELETE REPORT ERROR:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reports Management</h2>
      <div className="bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Message</th>
              <th>User</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="p-3">{r.message}</td>
                <td>{r.author?.firstName} {r.author?.lastName}</td>
                <td>{r.status}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => updateStatus(r._id, "Approved")}
                    className="text-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(r._id, "Rejected")}
                    className="text-red-600"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => deleteReport(r._id)}
                    className="text-gray-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}