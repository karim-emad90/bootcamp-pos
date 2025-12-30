import axios from "axios";
import { use, useEffect, useState } from "react";
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
  const [openModal,setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [extraFoods,setExtraFoods] = useState([]);
  const [extraQty,setExtraQty]= useState({});
  const finalPrice = useCartStore((state) => state.finalPrice);
  const [showFinalPrice, setShowFinalPrice] = useState(false);
  

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
        res.data.data.foods.map(el => {
          console.log(el);
        })}).catch((err) => {

        })
        

        axios
      .get(`${API_BASE_URL}/api/extras?populate=*`)
      .then((res) => {
        console.log("CATEGORY RESPONSE 👉", res.data);
        setExtraFoods(res.data.data);
        console.log(res.data,data);
        }).catch((err) => {

        })
        }, [id]);
        ;

  

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

  const showExtraFoods = (food) => {
    
   
  }

     const extraPrice = (el) => {
    return (extraQty[el.documentId] || 0) * el.price;
  };

    const totalExtrasPrice = extraFoods.reduce((sum, el) => {
    return sum + (extraQty[el.documentId] || 0) * el.price;
  }, 0);


    const finalMealPrice =
    (selectedItem?.price || 0) + totalExtrasPrice;

  const increaseExtraQty = (el,id) => {
   setExtraQty((oldQty) => {
    const currentQty = oldQty[id] || 0;
    const newQty = currentQty + 1;

    return {
      ...oldQty,
      [id]:newQty
    }
   })

   setShowFinalPrice(true);
   


  }

 


   

  

  const decreaseExtraQty = (id) => {
    setExtraQty((oldQty) => {
      const currentQty = oldQty[id] ||0;
      if(currentQty >0){
        
      const newQty = currentQty - 1;
      return {
        ...oldQty,
        [id]: newQty
      }

      }else{
        return{
          ...oldQty,
          [id]:0
        }
      }

      
    })
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
           
          
      >
        {dataToRender.map((food) => {
          const imageUrl =
            food.img.url
              ? `${API_BASE_URL}${food.img.url}`
              : null;

          return (
            <div
              key={food.documentId}
              className="bg-white rounded-2xl flex flex-col items-center p-3 shadow border"
              onClick={()=> {
                
                setOpenModal(true);
                setSelectedItem(food);
                showExtraFoods(food);

                const initialQty = {};
                extraFoods.forEach(el => {
                  initialQty[el.documentId] = 0;
                })

                
                setExtraQty(initialQty);

              }
              
              }
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

             
            </div>
          );
        })}
      </div>
      {openModal && (
  <div
    onClick={() => setOpenModal(false)}
    className="fixed inset-0 bg-black/40 z-40"
  />
)}

{/* Side Modal */}
<div
  className={`fixed top-0 right-0 h-full w-full lg:w-[380px] bg-white z-50
  transform transition-transform duration-300
  ${openModal ? "translate-x-0" : "translate-x-full"}`}
>
  {selectedItem && (
    <div className="p-2 lg:p-6 flex flex-col h-full w-full justify-center items-center">
      <button
        onClick={() => {setOpenModal(false);

        }
      }
        className="self-end text-gray-500 text-xl"
      >
        ✕
      </button>

      <img
        src={`${API_BASE_URL}${selectedItem.img?.url}`}
        className="w-full h-48 object-cover rounded-xl mt-4"
      />

      <h2 className="text-2xl font-bold mt-4">
        {selectedItem.name}
      </h2>

      <p className="text-lg text-gray-600 mt-2">
        {showFinalPrice? finalMealPrice : selectedItem.price} EGP
      </p>

      <p className="text-sm text-gray-500 mt-2">
        {selectedItem.description || "No description"}
      </p>

      <div className="w-full h-dvh flex justify-items-center items-center flex-col gap-4 bg-amber-200">
        {
          extraFoods.map(el => {
            
return(
            <div className="w-full flex g-3 justify-items-between items-center">
                  <img src={`${API_BASE_URL}${el.img.url}`} className="w-[50px] mr-3"/>
                  <p className="w-full text-sm font-bold">{el.name}</p>

                  <section className="w-full flex justify-between">
                    <button className="btn"
                            onClick={() => {decreaseExtraQty(el.documentId)}}
                    >-</button>
                    <div className="flex w-[40%]">
                       <p className="h-full self-center">{extraQty[el.documentId] || 0}X</p>
                       <p className="h-full self-center">{extraPrice(el)}EGP</p>
                    </div>
                    

                    <button onClick={() => {
                      increaseExtraQty(el, el.documentId)}
                      
                      } className="btn btn-warning">
                      +

                    </button>

                  </section>
                  
            </div>
           
)
            
          }
          )
        }

      </div>

      <button
        className="mt-auto btn btn-primary w-full"
        onClick={() => {
         addToCart({
                  id: selectedItem.documentId,
                  name: selectedItem.name,
                  img: selectedItem.img.url,

                  originalPrice: selectedItem.price,
                  extrasPrice: totalExtrasPrice,
                  finalPrice: finalMealPrice,
                  });
          setOpenModal(false);
          pushToCart;
        }}
      >
        Confirm Add to Cart
      </button>
    </div>
  )}
</div>
    </div>
  );
}
