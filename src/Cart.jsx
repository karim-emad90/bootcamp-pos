import { useState } from "react";
import useCartStore from "./useCartStore";
import { API_BASE_URL } from "./Config";

export default function Cart() {
  const cart = useCartStore(state => state.cart);
  const updateQty = useCartStore(state => state.updateQty);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const totalPrice = useCartStore(state => state.totalPrice());

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 && (
        <p className="text-gray-500 text-center">Cart is empty</p>
      )}

      {cart.map(item => (
        <CartItem
          key={item.id}
          item={item}
          updateQty={updateQty}
          removeFromCart={removeFromCart}
        />
      ))}

      {cart.length > 0 && (
        <div
          className="
            mt-4 bg-white p-6 rounded-xl shadow
            flex flex-col gap-4
            lg:flex-row lg:items-center lg:justify-between
          "
        >
          <h2 className="text-xl font-semibold">
            Total: <span className="text-green-600">{totalPrice} EGP</span>
          </h2>

          <button
            className="
              bg-yellow w-full
              lg:w-auto
              px-10 py-3 rounded-lg
              font-bold hover:bg-yellow-400 transition
            "
          >
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Cart Item ---------- */

function CartItem({ item, updateQty, removeFromCart }) {
  const [tempQty, setTempQty] = useState(item.qty);

  return (
    <div
      className="
        bg-white rounded-xl shadow p-4 mb-4
        flex flex-col gap-4
        lg:flex-row lg:items-center lg:gap-6
      "
    >
      {/* Image */}
      {item.img && (
        <img
          src={`${API_BASE_URL}${item.img}`}
          className="
            w-full h-48
            lg:w-24 lg:h-24
            object-cover rounded-lg
          "
          alt={item.name}
        />
      )}

      {/* Info */}
      <div className="flex-1 w-full text-center lg:text-left">
        <h3 className="font-bold text-2xl lg:text-lg">
          {item.name}
        </h3>

        <p className="text-gray-600 text-lg lg:text-sm">
          Price: {item.originalPrice} EGP
        </p>

        {item.extrasPrice > 0 && (
          <p className="text-gray-500 text-lg lg:text-sm">
            Extras: +{item.extrasPrice} EGP
          </p>
        )}

        <p className="text-gray-700 font-semibold text-lg lg:text-sm">
          Subtotal: {item.finalPrice * item.qty} EGP
        </p>
      </div>

      {/* Qty + Actions */}
      <div
        className="
          w-full flex flex-col gap-3
          lg:w-[160px] lg:items-center
        "
      >
        {/* Qty buttons */}
        <div className="flex w-full justify-between lg:justify-center lg:gap-4">
          <button
            onClick={() => setTempQty(q => q + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            ▲
          </button>

          <span className="font-bold text-lg lg:text-base">
            {tempQty}
          </span>

          <button
            onClick={() => setTempQty(q => Math.max(1, q - 1))}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            ▼
          </button>
        </div>

        {/* Actions */}
        <button
          onClick={() => updateQty(item.id, tempQty)}
          className="
            w-full bg-green-500 text-white
            py-2 rounded
            lg:text-sm
          "
        >
          OK
        </button>

        <button
          onClick={() => removeFromCart(item.id)}
          className="
            text-red-500 font-semibold
            text-lg lg:text-sm
          "
        >
          Remove
        </button>
      </div>
    </div>
  );
}
