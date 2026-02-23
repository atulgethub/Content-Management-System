import {useEffect,useState} from "react";
import API from "../../api/axios";

export default function UsersManagement(){

 const [users,setUsers]=useState([]);

 useEffect(()=>{
   API.get("/users").then(res=>setUsers(res.data));
 },[]);

 const deleteUser=async(id)=>{
   await API.delete(`/users/${id}`);
   setUsers(users.filter(u=>u._id!==id));
 };

 return(
  <div>

   <h2 className="text-2xl font-bold mb-6">
     Users Management
   </h2>

   {users.map(user=>(
     <div key={user._id}
       className="bg-white p-4 mb-2 flex justify-between">

       <div>
         {user.firstName} - {user.role}
       </div>

       <button
         onClick={()=>deleteUser(user._id)}
         className="text-red-500">
         Delete
       </button>

     </div>
   ))}

  </div>
 );
}