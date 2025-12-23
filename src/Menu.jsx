import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./Config";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `${API_BASE_URL}/api/categories?populate=*`;
    axios
      .get(url)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  const getCategoryItems = (id) => {
    navigate(`./${id}`); // تستخدم ID الصحيح من Strapi
  };

  return (
    <div className="w-full h-full overflow-auto">
      <h1 className="text-3xl font-bold my-4">Menu Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {categories.map((el) => {
          const category = el.attributes;
          const imageUrl =
            category.img?.data?.attributes?.url
              ? `${API_BASE_URL}${category.img.data.attributes.url}`
              : "https://via.placeholder.com/300";

          return (
            <div
              onClick={() => getCategoryItems(el.id)}
              key={el.id}
              className="bg-white rounded-2xl flex flex-col items-center p-3 shadow border hover:bg-yellow transition duration-500 opacity-70 hover:opacity-100 cursor-pointer"
            >
              <img
                className="w-full h-64 object-cover rounded-xl"
                src={imageUrl}
                alt={category.name}
              />
              <h3 className="text-2xl text-neutral-900 mt-2">{category.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
