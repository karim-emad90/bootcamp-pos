import {  NavLink, useNavigate } from "react-router-dom";
import MainLogo from './assets/pos.png'
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdCancel } from "react-icons/md";


export default function SideMenu() {
  
  const [guest,setGuest] = useState();
  const [showSideMenu,setSideMenu] = useState(false);
  useEffect(()=> {
    
   let guestStatus = JSON.parse(localStorage.getItem('guest'));
   console.log(guestStatus);

   
   setGuest(guestStatus);
  },[]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
    if(guest){
      navigate('/register');
    }

  }
  return (
    <div>
     
    <button
    onClick={()=>setSideMenu(true)}
    className="lg:hidden fixed top-8 left-40 z-50 bg-white p-2 rounded-lg shadow"
    >
       <FaBars className="text-yellow-500 text-xl" />
    </button>

     
    <div className={`
          fixed top-0 left-0 h-full w-full lg:w-[265px] bg-white z-50
          flex flex-col g-3
          transform transition-transform duration-300

          ${showSideMenu ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0 md:static md:block
        `}>

         
      { 
        
        guest && (
          <div className="flex justify-between items-center">
        <div className="w-full flex justify-center">
             <img src={MainLogo} />
        </div>
         <div className="md:hidden flex justify-start p-4">
          <button
            onClick={() => setSideMenu(false)}
            className="text-xl font-bold text-black"
          >
            <MdCancel className="text-2xl text-red-600" />

          </button>
        </div>
        </div>
        )

        

        
      }
      
       
      
   
        
        
<div className="w-full flex flex-col gap-3">
   <NavLink onClick={() => setSideMenu(false)} className={({ isActive }) =>
    "hover:bg-yellow rounded p-3 text-red-700 font-bold " + (isActive ? "bg-yellow text-red" : "")
  } to='/'>Home</NavLink>
              <NavLink onClick={() => setSideMenu(false)} className={({ isActive }) =>
    "hover:bg-yellow rounded p-3 text-red-700 font-bold " + (isActive ? "bg-yellow text-red" : "")
  } to="/dashboard">Dash Board</NavLink>
              <NavLink onClick={() => setSideMenu(false)} className={({ isActive }) =>
    "hover:bg-yellow rounded p-3 text-red-700 font-bold " + (isActive ? "bg-yellow text-red" : "")
  } to="/invoices">Invoices</NavLink>
              <NavLink onClick={() => setSideMenu(false)} className={({ isActive }) =>
    "hover:bg-yellow rounded p-3 text-red-700 font-bold " + (isActive ? "bg-yellow text-red" : "")
  } to="/order">Orders</NavLink>

  <NavLink onClick={() => setSideMenu(false)} className={({ isActive }) =>
    "hover:bg-yellow rounded p-3 text-red-700 font-bold " + (isActive ? "bg-yellow text-red" : "")
  } to="/menu">Foods & Drinks</NavLink>
</div>
              

  <button className={guest?"btn btn-success w-full text-white":'btn btn-error w-full text-white'} onClick={handleLogout}>{guest?'Make Account':'Logout'}</button>
    </div> 
    </div>
  )
}
