import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useSearchStore from "./useSearchStore";
import useCartStore from "./useCartStore";

export default function TopNavigation({ level, categoryName }) {
  const navigate = useNavigate();
  const search = useSearchStore(state => state.search);
  const setSearch = useSearchStore(state => state.setSearch);
  const totalItems = useCartStore(state => state.totalItems());

  const navigatePrevious = () => {
    if (level === "categoryFoods") navigate("/menu");
    else navigate(-1);
  };

  return (
    <header className="w-full bg-white shadow-sm px-4 py-3 sticky top-0 z-30">
      {/* Top Row */}
      <div className="flex items-center justify-between gap-3">
        {/* Left */}
        <div className="flex items-center gap-3">
          <FaLongArrowAltLeft
            onClick={navigatePrevious}
            className="cursor-pointer text-xl text-gray-700"
          />

          {/* Breadcrumb – hidden on mobile */}
          <div className="hidden md:flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-black">
              Foods & Drinks
            </Link>

            <MdOutlineKeyboardArrowRight />

            <Link to="/menu" className="hover:text-black">
              Categories
            </Link>

            {level === "categoryFoods" && (
              <>
                <MdOutlineKeyboardArrowRight />
                <span className="font-semibold text-gray-800">
                  {categoryName}
                </span>
              </>
            )}
          </div>

          {/* Mobile title */}
          <span className="md:hidden font-semibold text-gray-800">
            {categoryName || "Categories"}
          </span>
        </div>

        {/* Right */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer text-xl"
        >
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative mt-3">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full pl-10 pr-4 py-2 rounded-xl
            border border-gray-200
            focus:outline-none focus:ring-2 focus:ring-yellow-400
          "
        />
      </div>
    </header>
  );
}
