import {useEffect,useState} from "react";
import API from "../../api/axios";

export default function AdminBlogs(){

 const [blogs,setBlogs]=useState([]);

 const fetchBlogs=()=>{
   API.get("/cms").then(res=>setBlogs(res.data));
 };

 useEffect(fetchBlogs,[]);

 const deleteBlog=async(id)=>{
   await API.delete(`/cms/${id}`);
   fetchBlogs();
 };

 return(
  <div>

   <h2 className="text-2xl font-bold mb-6">
     Manage Blogs
   </h2>

   {blogs.map(blog=>(
     <div key={blog._id}
       className="bg-white p-5 mb-3 rounded shadow flex justify-between">

        <div>
          <h3>{blog.title}</h3>
          <p>{blog.author?.firstName}</p>
        </div>

        <div className="space-x-3">
          <button className="text-blue-600">Edit</button>

          <button
            onClick={()=>deleteBlog(blog._id)}
            className="text-red-600">
            Delete
          </button>
        </div>

     </div>
   ))}

  </div>
 );
}