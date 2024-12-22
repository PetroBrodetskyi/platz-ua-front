import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from '../../components/ProductList';
import Following from '../../components/Following';
import SidebarLeft from '../../components/SidebarLeft';
import VipList from '../../components/VipList';
import SidebarRight from '../../components/SidebarRight';
import { useNavigate } from 'react-router-dom';
import scss from './Home.module.scss';
import { ConfirmationLogin } from '../../components/Confirmation/Confirmation';
import Filter from '../../components/Filter';

const Home = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const handleCreateAdClick = () => {
    if (!user) {
      setShowConfirmation(true);
    } else {
      navigate('/create');
    }
  };

  const handleLoginConfirm = () => {
    navigate('/auth');
    setShowConfirmation(false);
  };

  const handleLoginCancel = () => {
    setShowConfirmation(false);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await dispatch(removeFromCartBack(productId)).unwrap();
    } catch (error) {
      console.error('Failed to remove product from cart:', error);
    }
  };

  return (
    <div className={scss.home}>
      {user && <Following />}
      <div className={scss.filterVip}>
        <div className={scss.sidebarLeft}>
          <SidebarLeft />
        </div>
        <div className={scss.lists}>
          <div className={scss.vipList}>
            <h3 className={scss.title}>VIP-оголошення</h3>
            <VipList />
          </div>
          <div className={scss.filter}>
            <Filter />
          </div>
          <div id="productList">
            <ProductList />
          </div>
        </div>
        <div className={scss.sidebarRight}>
          <SidebarRight
            cartItems={cartItems}
            selectedProducts={selectedProducts}
            handleRemoveFromCart={handleRemoveFromCart}
            onCreateAdClick={handleCreateAdClick}
          />
        </div>
      </div>

      {showConfirmation && (
        <ConfirmationLogin
          message="Для створення оголошення, будь ласка, увійдіть у свій акаунт"
          onConfirm={handleLoginConfirm}
          onCancel={handleLoginCancel}
        />
      )}
    </div>
  );
};

export default Home;
