import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Sidebar from '../Sidebar/Sidebar';
import scss from './ProductList.module.scss';
import ViewToggle from './ViewToggle/ViewToggle';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCartBack } from '../../redux/features/cartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [viewMode, setViewMode] = useState('grid');
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

  const handleRemoveFromCart = async (productId) => {
    try {
      await dispatch(removeFromCartBack(productId)).unwrap();
    } catch (error) {
      console.error('Failed to remove product from cart:', error);
    }
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
