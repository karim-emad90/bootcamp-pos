import { useState } from "react";
import useCartStore from "./useCartStore";

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
        <div className="mt-6 bg-white p-6 rounded-xl shadow flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Total: <span className="text-green-600">{totalPrice} EGP</span>
          </h2>

          <button className="bg-yellow px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition">
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
    <div className="bg-white rounded-xl shadow p-4 mb-4 flex gap-4">
      {item.img && (
        <img
          src={item.img}
          className="w-24 h-24 object-cover rounded-lg"
        />
      )}

      <div className="flex-1">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-gray-600">
          Price: {item.price} EGP
        </p>
        <p className="text-gray-600">
          Subtotal: {item.price * item.qty} EGP
        </p>
      </div>

      {/* Qty Controls */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => setTempQty(q => q + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          ▲
        </button>

        <span className="font-bold">{tempQty}</span>

        <button
          onClick={() => setTempQty(q => Math.max(1, q - 1))}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          ▼
        </button>

        <button
          onClick={() => updateQty(item.id, tempQty)}
          className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
        >
          OK
        </button>

        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 text-sm mt-1"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
