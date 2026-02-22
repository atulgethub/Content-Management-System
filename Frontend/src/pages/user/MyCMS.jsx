import { useEffect,useState } from "react";
import API from "../../api/axios";

export default function MyCMS(){

 const [cms,setCms]=useState([]);

 useEffect(()=>{
  API.get("/cms").then(res=>setCms(res.data));
 },[]);

 return(
  <div className="card">
    <h2 className="text-xl font-bold mb-4">My CMS</h2>

    {cms.map(item=>(
      <div key={item._id}
        className="border p-3 rounded mb-2">

        <h3>{item.title}</h3>
        <p>{item.status}</p>

      </div>
    ))}
  </div>
 );
}