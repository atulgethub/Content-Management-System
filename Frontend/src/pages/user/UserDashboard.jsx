import { useEffect,useState } from "react";
import API from "../../api/axios";

export default function UserDashboard(){

  const [blogs,setBlogs] = useState([]);

  useEffect(()=>{
    API.get("/cms").then(res=>setBlogs(res.data));
  },[]);

  return(
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Welcome User 👋
      </h2>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 gap-6 mb-8">

        <div className="bg-white p-6 rounded shadow">
          <h3>Total Blogs</h3>
          <p className="text-3xl font-bold">
            {blogs.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3>Recent Activity</h3>
          <p>Active</p>
        </div>

      </div>

    </div>
  );
}