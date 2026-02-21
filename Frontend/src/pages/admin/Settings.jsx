export default function Settings() {
  return (
    <div className="card max-w-xl">

      <h2 className="text-xl font-bold mb-4">System Settings</h2>

      <input className="input mb-3" placeholder="Site Name" />
      <input className="input mb-3" placeholder="Site Email" />

      <div className="flex gap-3">
        <button className="bg-blue-600 text-white px-5 py-2 rounded">
          Save Changes
        </button>

        <button className="bg-gray-300 px-5 py-2 rounded">
          Cancel
        </button>
      </div>

    </div>
  );
}