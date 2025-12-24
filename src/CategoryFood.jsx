import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "./Config";

export default function CategoryFood() {
  const { id } = useParams(); // ده documentId
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/categories/${id}?populate=foods.img`)
      .then((res) => {
        console.log("CATEGORY RESPONSE 👉", res.data);
        setItems(res.data.data.foods || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div className="w-full h-full overflow-auto">
      <h1>Category Items</h1>

      {items.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No items in this category
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {items.map((food) => {
          const imageUrl =
            food.img?.url
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

              <button className="btn btn-primary mt-2">
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
