// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchProductsByCategory,
//   fetchExchangeRate
// } from '../../redux/features/productsSlice';
// import { toggleFavorite } from '../../redux/features/favoritesSlice';
// import { handleAddToCart, renderSkeletons } from '../ProductCard/variables';
// import { useNavigate } from 'react-router-dom';
// import Notification from '../Notification/Notification';
// import Card from '../ProductCard/Card';
// import useOwners from '../../hooks/useOwners';
// import scss from '../ProductCard/ProductCard.module.scss';

// const FilterProductCard = ({ viewMode, category }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { products, exchangeRate, exchangeRateLoading } = useSelector(
//     (state) => state.products
//   );
//   const favorites = useSelector((state) => state.favorites.items);
//   const cartItems = useSelector((state) => state.cart.items);

//   const [loading, setLoading] = useState(true);
//   const [notification, setNotification] = useState('');
//   const [showDescriptions, setShowDescriptions] = useState({});

//   const owners = useOwners(products);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         setLoading(true);
//         await dispatch(fetchProductsByCategory({ category })).unwrap();
//       } catch (error) {
//         console.error('Failed to fetch products by category:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//     dispatch(fetchExchangeRate());
//   }, [dispatch, category]);

//   const handleProductClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   const handleOwnerClick = (ownerId) => {
//     if (ownerId) navigate(`/user/${ownerId}`);
//   };

//   const handleToggleDescription = (productId) => {
//     setShowDescriptions((prev) => ({ ...prev, [productId]: !prev[productId] }));
//   };

//   const approvedProducts = products.filter(
//     (product) => product.status === 'approved' || product.status === 'vip'
//   );

//   const renderProducts = () => {
//     if (loading || exchangeRateLoading) {
//       return renderSkeletons(6, viewMode);
//     }

//     if (!exchangeRate) {
//       return <p className={scss.error}>Помилка завантаження курсу валют.</p>;
//     }

//     return approvedProducts.map((product) => {
//       const isInCart = cartItems.some((item) => item._id === product._id);
//       const ownerData = owners[product.owner];

//       return (
//         <Card
//           key={product._id}
//           product={product}
//           ownerData={ownerData}
//           isInCart={isInCart}
//           favorites={favorites}
//           showDescription={showDescriptions[product._id]}
//           exchangeRate={exchangeRate}
//           onToggleDescription={() => handleToggleDescription(product._id)}
//           onAddToCart={() =>
//             handleAddToCart(
//               product,
//               isInCart,
//               owners,
//               cartItems,
//               dispatch,
//               setNotification
//             )
//           }
//           onFavoriteToggle={() => dispatch(toggleFavorite(product._id))}
//           onProductClick={() => handleProductClick(product._id)}
//           onOwnerClick={() => handleOwnerClick(product.owner)}
//           viewMode={viewMode}
//         />
//       );
//     });
//   };

//   return (
//     <>
//       <ul className={`${scss.list} ${scss[viewMode]}`}>{renderProducts()}</ul>
//       {notification && (
//         <Notification
//           message={notification}
//           onClose={() => setNotification('')}
//         />
//       )}
//     </>
//   );
// };

// export default FilterProductCard;
