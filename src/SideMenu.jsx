import { Link, NavLink, useNavigate } from "react-router-dom";
import MainLogo from './assets/pos.png'
import { useEffect, useState } from "react";

export default function SideMenu() {
  
  const [guest,setGuest] = useState()
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
    <div className="w-full h-dvh flex flex-col g-3 p-4   border-r border-r-grey">
      { 
        
        guest && (<div className="w-full flex justify-center">
             <img src={MainLogo} />
        </div>)
      }
   
        
        

              <NavLink className={({ isActive }) =>
    "hover:bg-yellow rounded p-3 " + (isActive ? "bg-yellow" : "")
  } to='/'>Home</NavLink>
              <NavLink className={({ isActive }) =>
    "hover:bg-yellow rounded p-3 " + (isActive ? "bg-yellow" : "")
  } to="/dashboard">Dash Board</NavLink>
              <NavLink className={({ isActive }) =>
    "hover:bg-yellow rounded p-3 " + (isActive ? "bg-yellow" : "")
  } to="/invoices">Invoices</NavLink>
              <NavLink className={({ isActive }) =>
    "hover:bg-yellow rounded p-3 " + (isActive ? "bg-yellow" : "")
  } to="/order">Orders</NavLink>

  <NavLink className={({ isActive }) =>
    "hover:bg-yellow rounded p-3 " + (isActive ? "bg-yellow" : "")
  } to="/menu">Foods & Drinks</NavLink>

  <button className={guest?"btn btn-success w-full":'btn btn-error w-full'} onClick={handleLogout}>{guest?'Make Account':'Logout'}</button>
    </div>  
  )
}
