import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Reports() {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    const res = await API.get("/reports");
    setReports(res.data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/reports/${id}/status`, { status });
    fetchReports();
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="p-3">{r.message}</td>
                <td>{r.author?.firstName}</td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}