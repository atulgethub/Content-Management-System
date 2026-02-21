export default function UserDashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Welcome User</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">My CMS Entries</div>
        <div className="card">My Reports</div>
      </div>
    </>
  );
}