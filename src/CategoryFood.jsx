import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "./Config";

export default function CategoryFood() {
    const [items, setItems] = useState();
    const params = useParams();

    useEffect(()=> {
     let categoryId = params.id;
     let domain = API_BASE_URL;
     let endPoint = `/api/categories/${categoryId}`;
     let url = domain + endPoint;
     axios.get(url,{
        params:{
            populate:{
                foods: {
                    populate:'*'
                }
            }
        }
     }).then((res) => {
        setItems(res.data.data.foods);
     }).catch(()=> {

     })
    },[])
  return (
    <div className="w-full h-full overflow-auto ">
      <h1>Category Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 p-4">
        
            {
                items?.map((el) => (
                <div className="bg-white rounded-2xl flex flex-col items-center p-3 gap-2 shadow border hover:bg-yellow transition duration-500 opacity-70 hover:opacity-100">
                   <img className='w-full h-8/10' src={`${API_BASE_URL}${el.img.url}`} />
                   <h3 className='text-2xl text-neutral-900'>{el.name}</h3>
                   <p>price: {el.price}EGP</p>
                   <button className="btn btn-primary">Add to cart</button>
                </div>
                ))
            }
                
           
        
          
             
             
          </div>
    </div>
  )
}
