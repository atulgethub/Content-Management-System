import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Settings() {

  const [settings, setSettings] = useState({
    siteName: "",
    siteEmail: "",
    maintenance: false
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const res = await API.get("/settings");
    setSettings(res.data);
  };

  const saveSettings = async () => {
    await API.post("/settings", settings);
    alert("Settings Saved");
  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        System Settings
      </h2>

      <div className="bg-white p-6 rounded shadow max-w-xl">

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Site Name"
          value={settings.siteName}
          onChange={(e)=>setSettings({
            ...settings,
            siteName:e.target.value
          })}
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Site Email"
          value={settings.siteEmail}
          onChange={(e)=>setSettings({
            ...settings,
            siteEmail:e.target.value
          })}
        />

        {/* TOGGLE */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            checked={settings.maintenance}
            onChange={(e)=>setSettings({
              ...settings,
              maintenance:e.target.checked
            })}
          />
          Maintenance Mode
        </div>

        <button
          onClick={saveSettings}
          className="bg-blue-600 text-white px-6 py-2 rounded">
          Save Changes
        </button>

      </div>

    </div>
  );
}