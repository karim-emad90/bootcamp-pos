import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "./Config";

export default function CategoryFood() {
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const url = `${API_BASE_URL}/api/categories/${id}?populate=foods`;

    axios
      .get(url)
      .then((res) => {
        // حماية لو البيانات فاضية
        const foods = res.data.data?.attributes?.foods || [];
        setItems(foods);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div className="w-full h-full overflow-auto">
      <h1>Category Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {items.map((el) => {
          const food = el.attributes || {};
          const imgUrl = food.img?.url
            ? `${API_BASE_URL}${food.img.url}`
            : "https://via.placeholder.com/300";

          return (
            <div
              key={el.id}
              className="bg-white rounded-2xl flex flex-col items-center p-3 gap-2 shadow border hover:bg-yellow transition duration-500 opacity-70 hover:opacity-100"
            >
              <img
                className="w-full h-64 object-cover rounded-xl"
                src={imgUrl}
                alt={food.name || "Food"}
              />
              <h3 className="text-2xl text-neutral-900">{food.name || "Unnamed"}</h3>
              <p>price: {food.price || "-"} EGP</p>
              <button className="btn btn-primary">Add to cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
