import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "./Config";

export default function CategoryFood() {
  const [items, setItems] = useState([]);
  const { id } = useParams(); // ← ده documentId

  useEffect(() => {
    const url = `${API_BASE_URL}/api/categories/${id}?populate=foods.img`;

    axios.get(url)
      .then((res) => {
        setItems(res.data.data.foods);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div className="w-full h-full overflow-auto">
      <h1>Category Items</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {items.map((food) => {
          const imageUrl = food.img?.url
            ? `${API_BASE_URL}${food.img.url}`
            : "";

          return (
            <div
              key={food.documentId}
              className="bg-white rounded-2xl flex flex-col items-center p-3 gap-2 shadow border hover:bg-yellow transition duration-500"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  className="w-full h-64 object-cover rounded-xl"
                  alt={food.name}
                />
              )}

              <h3 className="text-2xl">{food.name}</h3>
              <p>{food.price} EGP</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
