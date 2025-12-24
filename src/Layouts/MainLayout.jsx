
import { Link, Outlet, useNavigate } from "react-router-dom";
import SideMenu from "../SideMenu";
import { useEffect } from "react";

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('token') || sessionStorage.getItem('token');
    let guestStatus = localStorage.getItem('guest');

    if(!token){

      navigate('/login');
      
    }

    if(!token && guestStatus){
      navigate('/');
      localStorage.setItem('guest', true);
    }else{
      localStorage.setItem('guest',false);
    }
  },[]);
  return (
    <div className="w-full flex">
        <div className="w-[256px] h-dvh overflow-hidden bg-white">
         <SideMenu/>
          
        </div>
        <div className="w-full h-dvh overflow-auto bg-yellow">
            <Outlet/>
        </div>
      
    </div>
  )
}
