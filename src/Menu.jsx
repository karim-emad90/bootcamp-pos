import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "./Config";

export default function Menu() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const url = `${API_BASE_URL}/api/categories?populate=*`;
        axios.get(url)
            .then((res) => {
                setCategories(res.data.data || []);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const goToCategory = (id) => {
        navigate(`./${id}`);
    }

    return (
        <div className="w-full h-full overflow-auto">
            <h1>Menu Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {categories.map((el) => {
                    const imgUrl = el.img?.url ? `${API_BASE_URL}${el.img.url}` : "https://via.placeholder.com/300";
                    return (
                        <div
                            key={el.id}
                            onClick={() => goToCategory(el.id)}
                            className="bg-white rounded-2xl flex flex-col items-center p-3 shadow border hover:bg-yellow transition duration-500 opacity-70 hover:opacity-100 cursor-pointer"
                        >
                            <img
                                className="w-full h-64 object-cover rounded-xl"
                                src={imgUrl}
                                alt={el.name || "Category"}
                            />
                            <h3 className="text-2xl text-neutral-900 mt-2">{el.name}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
