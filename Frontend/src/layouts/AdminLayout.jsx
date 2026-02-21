import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout(){
 return(
  <div className="flex">
    <Sidebar role="admin"/>
    <div className="flex-1">
      <Navbar/>
      <div className="p-6">
        <Outlet/>
      </div>
    </div>
  </div>
 );
}