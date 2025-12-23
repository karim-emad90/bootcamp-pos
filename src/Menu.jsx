import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "./Config";

export default function Menu() {
    const [categories,setCategories] = useState([]);

    useEffect(() => {
        let domain = API_BASE_URL;
        let endPoint = '/api/categories?populate=*';
        let url = domain + endPoint;
        axios.get(url).then((res) => {
          console.log(res.data.data);
          setCategories(res.data.data);
        }).catch((err) => {

        })
    },[])

    const navigate = useNavigate();

    const getCategoryItems = (id,e)=> {
        console.log(id);
        navigate(`./${id}`)
    }
  return (
    <div className="w-full h-full overflow-auto">
      <h1>Menu Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 p-4">
        {
            categories.map((el) =>(
                <div onClick={(event) => getCategoryItems(el.documentId,event)} key={el.documentId} className="bg-white rounded-2xl flex flex-col items-center p-3 shadow border hover:bg-yellow transition duration-500 opacity-70 hover:opacity-100">
            <img className='w-full h-8/10' src={API_BASE_URL + el.img?.url}/>
            <h3 className='text-2xl text-neutral-900'>{el.name}</h3>
            </div>
            ))
        }
          
             
             
          </div>
      
    </div>
  )
}
