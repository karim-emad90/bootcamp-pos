import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import useSearchStore from "./useSearchStore";




export default function TopNavigation({level,categoryName}) {
    const [showCategories,setCategories] =useState(false);
    const params= useParams();
    const navigate = useNavigate();
    const search = useSearchStore((state) => state.search);
    const setSearch = useSearchStore((state) => state.setSearch);
    useEffect(()=> {
       
        setCategories(showCategories);
        
    },[])

    const navigatePrevious = ()=> {
        if(level == 'categoryFoods'){
             navigate('/menu')
        }
        if(level == 'categories'){
            navigate('../');
        }
         
      
    
    }

   
  return (
    <div className="w-full p-8 items-center  flex justify-between">
        <section className="w-[50%] h-[30px] flex items-center gap-2">
            
            <FaLongArrowAltLeft onClick={navigatePrevious} className="mr-10 cursor-pointer text-xl" />
            <Link>Foods & Drinks</Link>

             {level === "categories" && (
          <>
            <MdOutlineKeyboardArrowRight />
            <Link to="/menu">Categories</Link>
          </>
        )}

        {level === "categoryFoods" && (
          <>
            <MdOutlineKeyboardArrowRight />
            <Link to="/menu">Categories</Link>
            <MdOutlineKeyboardArrowRight />
            <span>{categoryName} Foods</span>
          </>
        )}

            
        
        </section>
        
        <section className="relative">
         <input 
         type="text" 
         className="block p-6 input width-[20%]  bg-white text-grey text-xl" 
         placeholder="search ..."
         value={search} 
         onChange={(e) => {setSearch(e.target.value)}}
         />
        <FiSearch className="absolute top-4 left-1 text-xl text-red-800" />
        </section>
        

      
    </div>
  )
}
