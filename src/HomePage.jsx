import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "./Config";

export default function HomePage() {
    let domain = API_BASE_URL;
        let endPoint = '/api/users/me';
        let url = domain + endPoint;

        const [user,setUser] = useState();
        const[phones,setPhones] = useState();
    useEffect(() => {
      let token = localStorage.getItem('token') || sessionStorage.getItem('token');
      axios.get(url,{
        headers: {
            Authorization:`Bearer ${token}`
        }
      }).then((res) => {
        setUser(res.data)
        console.log(res);

      }).catch((err) => {

      })

      
    },[])

    useEffect(() => {
      let domain = API_BASE_URL;
      let endPoint = '/api/phones?populate=*';
      let url = domain+endPoint;
      axios.get(url).then((res) =>{
        console.log(res.data);
        setPhones(res.data.data);
        console.log(phones);
      }
      ).catch((err)=> {});
    },[])
  return (
    <div className="w-full h-full overflow-auto">
      <h1>Welcome {user?.username}</h1>

      <div className="w-full grid grid-cols-3">
        {phones?.map((el, index) => (
<div className="card bg-base-100 w-96 shadow-sm" key={el.documentId}>
  <figure>
    <img
    className="w-full h-[300px] object-contain"
      src={`${API_BASE_URL}${el.img.url}`}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{el.name}</h2>
    <p>Price is: ${el.price}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        ))}
      </div>
    </div>
  )
}
