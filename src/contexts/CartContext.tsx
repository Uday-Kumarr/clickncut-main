
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  cart: CartItem[]; // Added cart property
  addToCart: (product: Product, quantity: number, rentalDays: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateRentalDays: (productId: string, days: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getCartTotal: () => number; // Added getCartTotal property
  getItemCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on initialization
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number, rentalDays: number) => {
    setItems(currentItems => {
      // Check if the product is already in the cart
      const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast({
          title: "Cart updated",
          description: `${product.name} quantity updated in cart`,
          variant: "default",
        });
        return updatedItems;
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${product.name} added to cart`,
          variant: "default",
        });
        return [...currentItems, { 
          id: product.id, 
          name: product.name, 
          price: product.price,
          image: product.image,
          quantity 
        }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === productId);
      const filteredItems = currentItems.filter(item => item.id !== productId);
      
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.name} removed from cart`,
          variant: "default",
        });
      }
      
      return filteredItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const updateRentalDays = (productId: string, days: number) => {
    if (days <= 0) return;
    
    setItems(currentItems => 
      currentItems.map(item => 
        item.id === productId
          ? { ...item, rentalDays: days }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
      variant: "default",
    });
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Add getCartTotal as an alias for getTotalPrice to fix the error
  const getCartTotal = () => {
    return getTotalPrice();
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    items,
    cart: items, // Map items to cart for backward compatibility
    addToCart,
    removeFromCart,
    updateQuantity,
    updateRentalDays,
    clearCart,
    getTotalPrice,
    getCartTotal, // Add getCartTotal to the context value
    getItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
