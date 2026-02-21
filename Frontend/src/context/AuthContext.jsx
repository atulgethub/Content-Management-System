import {createContext,useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import API from "../api/axios";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{

 const navigate=useNavigate();
 const [user,setUser]=useState(null);

 useEffect(()=>{
  const saved=localStorage.getItem("user");
  if(saved) setUser(JSON.parse(saved));
 },[]);

 const login=async(data)=>{
   const res=await API.post("/auth/login",data);

   localStorage.setItem("token",res.data.token);
   localStorage.setItem("user",JSON.stringify(res.data.user));

   setUser(res.data.user);

   if(res.data.user.role==="admin")
     navigate("/admin");
   else
     navigate("/user");
 };

 const logout=()=>{
  localStorage.clear();
  setUser(null);
  navigate("/");
 };

 return(
  <AuthContext.Provider value={{user,login,logout}}>
    {children}
  </AuthContext.Provider>
 );
};