import React, { useState } from 'react';
import SidebarCart from './SidebarCart/SidebarCart';
import SidebarFavorites from './SidebarFavorites/SidebarFavorites';
import { IoChevronUpOutline, IoChevronDownSharp } from "react-icons/io5";
import scss from './Sidebar.module.scss';

const Sidebar = ({ cartItems, selectedProducts, handleRemoveFromCart, handleProductClick }) => {
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(true);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const toggleFavorites = () => {
    setIsFavoritesOpen((prev) => !prev);
  };

  return (
    <div className={scss.cartSidebar}>
      <h3 onClick={toggleCart} className={scss.toggleHeader}>
        Кошик {isCartOpen ? <IoChevronUpOutline /> : <IoChevronDownSharp />}
      </h3>
      {isCartOpen && (
        <div className={scss.cartContent}>
          <SidebarCart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />
        </div>
      )}
      
      <div className={scss.divider}></div>

      <h3 onClick={toggleFavorites} className={scss.toggleHeader}>
        Обрані {isFavoritesOpen ? <IoChevronUpOutline /> : <IoChevronDownSharp />}
      </h3>
      {isFavoritesOpen && (
        <div className={scss.cartContent}>
          <SidebarFavorites />
        </div>
      )}

      <div className={scss.divider}></div>
    </div>
  );
};

export default Sidebar;
