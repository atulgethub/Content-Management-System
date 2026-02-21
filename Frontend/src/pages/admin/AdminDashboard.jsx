export default function AdminDashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <div className="card">Total Users</div>
        <div className="card">Total CMS</div>
        <div className="card">Reports</div>
        <div className="card">System Status</div>
      </div>
    </>
  );
}