import {useEffect,useState} from "react";
import API from "../../api/axios";

export default function MyReports(){

 const [reports,setReports]=useState([]);

 useEffect(()=>{
  API.get("/reports").then(res=>setReports(res.data));
 },[]);

 return(
  <div className="card">
   <h2 className="text-xl font-bold mb-4">My Reports</h2>

   {reports.map(r=>(
     <div key={r._id} className="border p-3 mb-2 rounded">
       {r.message} — {r.status}
     </div>
   ))}
  </div>
 );
}