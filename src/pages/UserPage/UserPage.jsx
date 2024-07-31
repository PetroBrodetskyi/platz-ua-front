import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserById, updateUserDetails } from '../../redux/features/authSlice';
import { fetchUserProducts, fetchUsersPublicProducts } from '../../redux/features/productsSlice';
import UserProfile from '../../components/UserProfile/UserProfile';
import UserProducts from '../../components/UserProducts/UserProducts';
import AddProductForm from '../../components/AddProductForm/AddProductForm';
import { IoClose } from 'react-icons/io5';
import { AiOutlinePlus, AiOutlineUser } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import scss from './UserPage.module.scss';

const UserPage = () => {
  const { userId } = useParams();
  const [products, setProducts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.owner);
  const currentUser = useSelector((state) => state.auth.user);
  const userProducts = useSelector((state) => state.products.userProducts);

  useEffect(() => {
    if (userId) {
      if (currentUser && currentUser._id === userId) {
        dispatch(fetchUserProducts());
      } else {
        dispatch(fetchUsersPublicProducts(userId));
      }
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId, currentUser]);

  useEffect(() => {
    setProducts(userProducts);
  }, [userProducts]);

  const handleUpdate = (formData) => {
    dispatch(updateUserDetails(formData));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const toggleProfileVisibility = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const handleOverlayClick = () => {
    if (isFormVisible) {
      toggleFormVisibility();
    }
    if (isProfileVisible) {
      toggleProfileVisibility();
    }
  };

  return (
    <div className={scss.userPage}>
      {user ? (
        <div className={scss.productsProfileContainer}>
          <div>
            <UserProducts products={products} setProducts={setProducts} />
          </div>
          {currentUser && currentUser._id === userId && (
            <div className={`${scss.sidebar} ${isFormVisible || isProfileVisible ? scss.hidden : ''}`}>
              <div className={scss.buttons}>
                <button onClick={toggleFormVisibility} className={scss.addButton}>
                  <AiOutlinePlus />
                </button>
                <button onClick={toggleProfileVisibility} className={scss.profileButton}>
                  <AiOutlineUser />
                </button>
              </div>
            </div>
          )}
          <AnimatePresence>
            {(isFormVisible || isProfileVisible) && (
              <motion.div
                className={`${scss.overlay} ${isFormVisible || isProfileVisible ? scss.visible : ''}`}
                onClick={handleOverlayClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {isFormVisible && (
                  <motion.div
                    className={`${scss.form} ${isFormVisible ? scss.visible : ''}`}
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                  >
                    <IoClose className={scss.closeButton} onClick={toggleFormVisibility} />
                    <AddProductForm />
                  </motion.div>
                )}
                {isProfileVisible && (
                  <motion.div
                    className={`${scss.profile} ${isProfileVisible ? scss.visible : ''}`}
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                  >
                    <IoClose className={scss.closeButton} onClick={toggleProfileVisibility} />
                    {currentUser && currentUser._id === user._id && <UserProfile user={user} onUpdate={handleUpdate} />}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <p>Завантаження даних...</p>
      )}
    </div>
  );
};

export default UserPage;
