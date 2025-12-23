import { Link, NavLink, useNavigate } from "react-router-dom";
import MainLogo from './assets/pos.jpg'

export default function SideMenu() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');

  }
  return (
    
    <div className="w-full h-dvh flex flex-col g-3 p-4   border-r border-r-grey">
        <div className="w-full flex justify-center">
             <img src={MainLogo} />
        </div>
        

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
  } to="/menu">Menu</NavLink>

  <button className="btn btn-error w-full" onClick={handleLogout}>Logout</button>
    </div>  
  )
}
