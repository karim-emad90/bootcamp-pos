import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const cart = get().cart;
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      set({
        cart: cart.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        ),
      });
    } else {
      set({
        cart: [...cart, { ...product, qty: 1 }],
      });
    }
  },

  updateQty: (id, qty) => {
    if (qty < 1) return;
    set({
      cart: get().cart.map(item =>
        item.id === id ? { ...item, qty} : item
      ),
    });
  },

  

  removeFromCart: (id) => {
    set({
      cart: get().cart.filter(item => item.id !== id),
    });
  },

  totalItems: () =>
    get().cart.reduce((sum, item) => sum + item.qty, 0),

  totalPrice: () =>
    get().cart.reduce((sum, item) => sum + item.qty * item.finalPrice, 0),

  
    })
);

export default useCartStore;
