import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function CMSManagement() {
  const [cms, setCms] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchCMS = async () => {
    try {
      const res = await API.get("/cms"); // backend must populate author
      setCms(res.data.map(c => ({
        ...c,
        author: c.author || { firstName: "Unknown", lastName: "" }
      })));
    } catch (err) {
      console.error("FETCH CMS ERROR:", err);
    }
  };

  useEffect(() => {
    fetchCMS();
  }, []);

  const startEdit = (c) => {
    setEditingId(c._id);
    setEditTitle(c.title);
    setEditContent(c.content);
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }
    try {
      await API.put(`/cms/${id}`, { title: editTitle, content: editContent });
      setEditingId(null);
      fetchCMS();
    } catch (err) {
      console.error("SAVE CMS ERROR:", err);
    }
  };

  const deleteCMS = async (id) => {
    if (!window.confirm("Are you sure you want to delete this CMS?")) return;
    try {
      await API.delete(`/cms/${id}`);
      fetchCMS();
    } catch (err) {
      console.error("DELETE CMS ERROR:", err);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await API.put(`/cms/${id}`, { status }); // match backend enum exactly
      fetchCMS();
    } catch (err) {
      console.error("CHANGE STATUS ERROR:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">CMS Management</h2>

      <div className="space-y-4">
        {cms.map((c) => (
          <div key={c._id} className="border p-4 rounded flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-1 w-full">
              {editingId === c._id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                    rows={4}
                  />
                </>
              ) : (
                <>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-gray-500 text-sm">{c.author.firstName} {c.author.lastName}</p>
                  <span
                    className={`px-2 py-1 rounded text-xs text-white ${
                      c.status === "Published"
                        ? "bg-green-600"
                        : c.status === "Draft"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {c.status}
                  </span>
                </>
              )}
            </div>

            <div className="flex gap-2 mt-2 md:mt-0">
              {editingId === c._id ? (
                <>
                  <button onClick={() => saveEdit(c._id)} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(c)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => deleteCMS(c._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                  <button onClick={() => changeStatus(c._id, "Published")} className="bg-green-600 text-white px-3 py-1 rounded">Publish</button>
                  <button onClick={() => changeStatus(c._id, "Draft")} className="bg-yellow-500 text-white px-3 py-1 rounded">Draft</button>
                  <button onClick={() => changeStatus(c._id, "Archived")} className="bg-gray-500 text-white px-3 py-1 rounded">Archive</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}