import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./Config";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/categories?populate=img`)
      .then((res) => {
        setCategories(res.data.data);
      });
  }, []);

  const getCategoryItems = (documentId) => {
    navigate(`/menu/${documentId}`);
  };

  return (
    <div className="w-full h-full overflow-auto">
      <h1>Menu Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {categories.map((el) => (
          <div
            key={el.documentId}
            onClick={() => getCategoryItems(el.documentId)}
            className="bg-white rounded-2xl cursor-pointer flex flex-col items-center p-3 shadow border hover:bg-yellow transition"
          >
            {el.img?.url && (
              <img
                src={`${API_BASE_URL}${el.img.url}`}
                className="w-full h-48 object-cover rounded-xl"
                alt={el.name}
              />
            )}

            <h3 className="text-2xl text-neutral-900">{el.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
