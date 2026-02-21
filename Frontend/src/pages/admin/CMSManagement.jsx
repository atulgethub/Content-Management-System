export default function CMSManagement() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">CMS Management</h1>

      <div className="card">
        <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
          Create New Entry
        </button>

        <table className="w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Author</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
}