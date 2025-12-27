import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "./Config";

export default function HomePage() {
    let domain = API_BASE_URL;
        let endPoint = '/api/users/me';
        let url = domain + endPoint;

        const [user,setUser] = useState();
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
        
      }
      ).catch((err)=> {});
    },[])
  return (
    <div className="w-full h-full overflow-auto">
      <h1>Welcome {user?.username}</h1>

      
    </div>
  )
}
