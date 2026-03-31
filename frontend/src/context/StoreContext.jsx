import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext({
  food_list: [],
  cartItems: {},
  setCartItems: () => {},
  addToCart: async () => {},
  removeFromCart: async () => {},
  getTotalCartAmount: () => 0,
  url: "",
  token: "",
  setToken: () => {},
});

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://royal-food-backend.vercel.app";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [food_list, setFoodlist] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const safePrev = prev || {};
      return { ...safePrev, [itemId]: (safePrev[itemId] || 0) + 1 };
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const safePrev = prev || {};
      return { ...safePrev, [itemId]: Math.max((safePrev[itemId] || 0) - 1, 0) };
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    const currentCart = cartItems || {};

    for (const item in currentCart) {
      if (currentCart[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * currentCart[item];
        }
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodlist(response.data.data || []);
    } catch (error) {
      console.log(error);
      setFoodlist([]);
    }
  };

  const clearInvalidToken = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const loadCartData = async (authToken) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token: authToken } });

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        clearInvalidToken();
      }
    } catch (error) {
      console.log(error);
      clearInvalidToken();
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems: cartItems || {},
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;