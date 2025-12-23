import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "./Config";

export default function CategoryFood() {
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    console.log("Category ID:", id); // debug للتأكد من ID

    const url = `${API_BASE_URL}/api/categories/${id}`;

    axios
      .get(url, {
        params: {
          populate: {
            foods: {
              populate: ["img"], // populate الصورة لكل food
            },
          },
        },
      })
      .then((res) => {
        const foodsData = res.data?.data?.attributes?.foods?.data || [];
        setItems(foodsData);
      })
      .catch((err) => {
        console.error("Error fetching category foods:", err);
      });
  }, [id]);

  return (
    <div className="w-full h-full overflow-auto">
      <h1 className="text-3xl font-bold my-4">Category Items</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {items.map((el) => {
          const food = el.attributes;
          const imageUrl =
            food.img?.data?.attributes?.url
              ? `${API_BASE_URL}${food.img.data.attributes.url}`
              : "https://via.placeholder.com/300"; // fallback

          return (
            <div
              key={el.id}
              className="bg-white rounded-2xl flex flex-col items-center p-3 gap-2 shadow border hover:bg-yellow transition duration-500 opacity-70 hover:opacity-100"
            >
              <img
                className="w-full h-64 object-cover rounded-xl"
                src={imageUrl}
                alt={food.name}
              />

              <h3 className="text-2xl text-neutral-900">{food.name}</h3>
              <p className="text-lg font-medium">Price: {food.price} EGP</p>
              <button className="btn btn-primary mt-2">Add to cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
