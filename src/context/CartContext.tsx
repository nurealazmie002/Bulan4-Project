import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveCart, getCart } from '../utils/storage';
import Toast from 'react-native-simple-toast';

interface CartItem {
  id: number | string; 
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (id: number | string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType>({} as any);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCartData = async () => {
      const savedCart = await getCart();
      if (savedCart && savedCart.length > 0) {
        setCart(savedCart);
      }
    };
    loadCartData();
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addToCart = (newItem: any) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id.toString() === newItem.id.toString()
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            id: newItem.id,
            title: newItem.title,
            price: newItem.price,
            thumbnail: newItem.thumbnail,
            quantity: 1, 
          },
        ];
      }
    });
  };

  const removeFromCart = (targetId: number | string) => {
    setCart((prevCart) => 
      prevCart.filter((item) => item.id.toString() !== targetId.toString())
    );
    Toast.show('Item dihapus', Toast.SHORT);
  };

  const clearCart = async () => {
    setCart([]);
    await saveCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);