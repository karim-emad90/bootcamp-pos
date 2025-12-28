import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "./Config";
import Swal from 'sweetalert2'
import TopNavigation from "./TopNavigation";
import useSearchStore from "./useSearchStore";
import useCartStore from "./useCartStore";

export default function CategoryFood() {
  const { id } = useParams(); // ده documentId
  const [items, setItems] = useState([]);
  const [guest,setGuestStatus] = useState();
  const navigate = useNavigate();
  const [itemName,setItemName] = useState();
  const search = useSearchStore((state) => state.search);
  const addToCart = useCartStore((state) => state.addToCart);
 

  useEffect(() => {
    let guest = JSON.parse(localStorage.getItem('guest'));
    localStorage.setItem('categoryFoods','true');
    setGuestStatus(guest);

    axios
      .get(`${API_BASE_URL}/api/categories/${id}?populate=foods.img`)
      .then((res) => {
        console.log("CATEGORY RESPONSE 👉", res.data);
        setItems(res.data.data.foods || []);
        setItemName(res.data.data.name);
     
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

   const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const dataToRender =
    search && filteredItems.length > 0 ? filteredItems : items;

  const pushToCart = () => {
 if(guest){
  Swal.fire({
    title: "You need to have an account to add to cart!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Register Page",
  confirmButtonColor: "#46cc41",
  cancelButtonText: "Continue without register",
  cancelButtonColor:'#f28f33',
  reverseButtons: true
  }).then((res) => {
    if(res.isConfirmed){
      navigate('/register');
    }
  })
 }
  }

  return (
    <div className="w-full h-full overflow-auto flex flex-col">
      <h1>Category Items</h1>
      
            <TopNavigation level="categoryFoods" categoryName={itemName}/>
           
      
      
      
     

      {dataToRender.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No items in this category
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {dataToRender.map((food) => {
          const imageUrl =
            food.img.url
              ? `${API_BASE_URL}${food.img.url}`
              : null;

          return (
            <div
              key={food.documentId}
              className="bg-white rounded-2xl flex flex-col items-center p-3 shadow border"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  className="w-full h-56 object-cover rounded-xl"
                  alt={food.name}
                />
              )}

              <h3 className="text-xl mt-2">{food.name}</h3>
              <p className="text-gray-700">{food.price} EGP</p>

              <button onClick={() => {
                pushToCart; addToCart({
                  id:food.documentId,
                  name: food.name,
                  price: food.price,
                  img:imageUrl
                });
              } } className="btn btn-primary mt-2">
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
