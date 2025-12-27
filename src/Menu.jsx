import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./Config";
import TopNavigation from "./TopNavigation";
import useSearchStore from "./useSearchStore";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const search = useSearchStore((state) => state.search)

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

 

  const filteredCategories = categories.filter((cat) => 
  cat.name.toLowerCase().includes(search.toLowerCase()))

   const dataToRender = 
  search && filteredCategories.length > 0 ? filteredCategories : categories;

  return (
    <div className="w-full h-full overflow-auto">
      <h1>Menu Categories</h1>
      <TopNavigation level="categories"/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {dataToRender.map((el) => (
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
