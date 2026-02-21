import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function UserLayout(){
 return(
  <div className="flex">
    <Sidebar role="user"/>
    <div className="flex-1">
      <Navbar/>
      <div className="p-6">
        <Outlet/>
      </div>
    </div>
  </div>
 );
}