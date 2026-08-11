import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_WISHLIST } from '../data/userMockData';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('bharat_yatra_wishlist');
    return saved ? JSON.parse(saved) : INITIAL_WISHLIST;
  });

  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem('bharat_yatra_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = (destId) => {
    return wishlist.some((item) => item.id === destId);
  };

  const toggleWishlist = (destId, collectionName = 'Dream Destinations') => {
    if (isInWishlist(destId)) {
      setWishlist((prev) => prev.filter((item) => item.id !== destId));
      showToast('Removed destination from your Wishlist 💔', 'info');
    } else {
      setWishlist((prev) => [...prev, { id: destId, collection: collectionName }]);
      showToast('Added destination to your Wishlist ❤️', 'success');
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
