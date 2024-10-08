export { default } from './ProductCard';

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import {
//   fetchProducts,
//   fetchExchangeRate,
//   fetchProductById
// } from '../../redux/features/productsSlice';
// import { fetchUserById } from '../../redux/features/authSlice';
// import { toggleFavorite } from '../../redux/features/favoritesSlice';
// import { addToCart, removeFromCart } from '../../redux/features/cartSlice';
// import { useNavigate } from 'react-router-dom';
// import { HiOutlineEye } from 'react-icons/hi';
// import { IoChevronUpOutline } from 'react-icons/io5';
// import { RiPlayList2Fill } from 'react-icons/ri';
// import Skeleton from '@mui/material/Skeleton';
// import Card from './Card';
// import Notification from '../Notification';
// import TitleFavorite from './TitleFavorite';
// import CartPrice from './CartPrice';
// import CreateCondition from './CreateCondition';
// import ProductDescription from './ProductDescription';
// import scss from './ProductCard.module.scss';

// const ProductCard = ({ viewMode }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { products, exchangeRate, totalProducts } = useSelector(
//     (state) => state.products
//   );
//   const favorites = useSelector((state) => state.favorites.items);
//   const cartItems = useSelector((state) => state.cart.items);

//   const [notification, setNotification] = useState('');
//   const [endOfListNotification, setEndOfListNotification] = useState(false);
//   const [showDescriptions, setShowDescriptions] = useState({});
//   const [owners, setOwners] = useState(
//     () => JSON.parse(localStorage.getItem('owners')) || {}
//   );
//   const [loadingOwners, setLoadingOwners] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const response = await dispatch(
//           fetchProducts({ page: currentPage, limit: 4 })
//         ).unwrap();
//         if (response.length === 0 || products.length >= totalProducts) {
//           setHasMore(false);
//           setEndOfListNotification(true);
//         }
//       } catch (error) {
//         console.error('Failed to fetch products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//     dispatch(fetchExchangeRate());
//   }, [dispatch, currentPage, products.length, totalProducts]);

//   useEffect(() => {
//     const fetchOwner = async (ownerId) => {
//       if (!owners[ownerId] && !loadingOwners[ownerId]) {
//         setLoadingOwners((prev) => ({ ...prev, [ownerId]: true }));
//         try {
//           const response = await dispatch(fetchUserById(ownerId)).unwrap();
//           setOwners((prev) => {
//             const newOwners = { ...prev, [ownerId]: response };
//             localStorage.setItem('owners', JSON.stringify(newOwners));
//             return newOwners;
//           });
//         } catch (error) {
//           console.error('Failed to fetch owner:', error);
//         } finally {
//           setLoadingOwners((prev) => ({ ...prev, [ownerId]: false }));
//         }
//       }
//     };

//     products.forEach(({ owner }) => {
//       if (owner && !owners[owner]) {
//         fetchOwner(owner);
//       }
//     });
//   }, [products, owners, loadingOwners, dispatch]);

//   const handleProductClick = (productId) => {
//     navigate(`/product/${productId}`);
//     dispatch(fetchProductById(productId));
//   };

//   const handleOwnerClick = (ownerId) => {
//     if (ownerId) {
//       navigate(`/user/${ownerId}`);
//     }
//   };

//   const handleAddToCart = (product, isInCart) => {
//     const productWithOwner = { ...product, owner: owners[product.owner] };
//     if (isInCart) {
//       dispatch(removeFromCart(product._id));
//     } else {
//       dispatch(addToCart(productWithOwner));
//     }
//     setNotification(
//       `${product.name} ${isInCart ? 'видалено з кошика' : 'додано до кошика'}!`
//     );
//   };

//   const handleToggleDescription = (productId) => {
//     setShowDescriptions((prev) => ({ ...prev, [productId]: !prev[productId] }));
//   };

//   const fetchMoreProducts = () => setCurrentPage((prevPage) => prevPage + 1);

//   const renderSkeletons = (count) => {
//     return Array.from({ length: count }).map((_, index) => (
//       <li key={index}>
//         <div>
//           <Skeleton
//             variant="rectangular"
//             animation="pulse"
//             className={`${scss.skelet} ${viewMode === 'grid' ? scss.gridItem : scss.listItem}`}
//           />
//           <div>
//             <Skeleton variant="text" width="100%" animation="pulse" />
//             <Skeleton variant="text" width="80%" animation="pulse" />
//             <Skeleton variant="text" width="60%" animation="pulse" />
//             <Skeleton variant="text" width="100%" animation="pulse" />
//           </div>
//         </div>
//       </li>
//     ));
//   };

//   return (
//     <>
//       <InfiniteScroll
//         dataLength={products.length}
//         next={fetchMoreProducts}
//         hasMore={hasMore}
//         endMessage={null}
//       >
//         <ul className={`${scss.list} ${scss[viewMode]}`}>
//           {loading
//             ? renderSkeletons(6)
//             : products.map((product) => {
//                 const isInCart = cartItems.some(
//                   (item) => item._id === product._id
//                 );
//                 const ownerData = owners[product.owner];

//                 return (
//                   <Card
//                     key={product._id}
//                     product={product}
//                     ownerData={ownerData}
//                     isInCart={isInCart}
//                     loading={loading}
//                     showDescriptions={showDescriptions}
//                     onToggleDescription={handleToggleDescription}
//                     onAddToCart={handleAddToCart}
//                     exchangeRate={exchangeRate}
//                     handleOwnerClick={handleOwnerClick}
//                   />
//                 );
//               })}
//         </ul>
//       </InfiniteScroll>
//       {notification && (
//         <Notification
//           message={notification}
//           onClose={() => setNotification('')}
//         />
//       )}
//       {endOfListNotification && (
//         <Notification
//           message="Ви подивилися всі оголошення"
//           onClose={() => setEndOfListNotification(false)}
//         />
//       )}
//     </>
//   );
// };

// export default ProductCard;
