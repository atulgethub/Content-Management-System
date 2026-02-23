import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function UserDashboard() {

 const [stats,setStats]=useState({
   totalBlogs:0,
   myBlogs:[],
 });

 useEffect(()=>{
   API.get("/dashboard/user")
     .then(res=>setStats(res.data));
 },[]);

 return(
  <div>

   <h2 className="text-2xl font-bold mb-6">
     User Dashboard
   </h2>

   {/* TOTAL BLOGS */}
   <div className="grid grid-cols-3 gap-6">

     <div className="bg-white p-6 rounded shadow">
       <h3>Total Blogs</h3>
       <p className="text-3xl">{stats.totalBlogs}</p>
     </div>

     <div className="bg-white p-6 rounded shadow">
       <h3>My Blogs</h3>
       <p className="text-3xl">{stats.myBlogs.length}</p>
     </div>

   </div>

   {/* RECENT BLOGS */}
   <h3 className="mt-10 font-bold text-xl">
     My Recent Blogs
   </h3>

   {stats.myBlogs.map(blog=>(
     <div key={blog._id} className="bg-white p-4 mt-3 rounded">
        {blog.title}
     </div>
   ))}

  </div>
 );
}