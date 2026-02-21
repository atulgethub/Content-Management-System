import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export default function Navbar(){

 const {user,logout}=useContext(AuthContext);

 return(
  <div className="bg-white shadow px-6 py-3 flex justify-between">
   <h2 className="font-semibold">Welcome {user?.firstName}</h2>
   <button onClick={logout} className="text-red-500">Logout</button>
  </div>
 );
}