import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Sidebar from '../Sidebar/Sidebar';
import scss from './ProductList.module.scss';
import ViewToggle from './ViewToggle/ViewToggle';

const ProductList = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [cartItems, setCartItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const savedViewMode = localStorage.getItem('viewMode');
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem('viewMode', mode);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  const handleProductClick = (productId) => {
    // Логіка для обробки натискання на продукт
  };

  return (
    <div className={scss.productListWrapper}>
      <div className={`${scss.productList} ${scss[viewMode]}`}>
        <div className={scss.header}>
          <h3 className={scss.title}>Найновіші</h3>
          <ViewToggle viewMode={viewMode} setViewMode={handleViewModeChange} />
        </div>
        <div className={scss.container}>
          <ProductCard viewMode={viewMode} />
        </div>
      </div>

      <Sidebar
        cartItems={cartItems}
        selectedProducts={selectedProducts}
        handleRemoveFromCart={handleRemoveFromCart}
        handleProductClick={handleProductClick}
      />
    </div>
  );
};

export default ProductList;
