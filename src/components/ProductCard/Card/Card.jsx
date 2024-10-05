// import { dispatch } from 'react';
// import { HiOutlineEye } from 'react-icons/hi';
// import { IoChevronUpOutline } from 'react-icons/io5';
// import { RiPlayList2Fill } from 'react-icons/ri';
// import Skeleton from '@mui/material/Skeleton';
// import TitleFavorite from '../TitleFavorite/TitleFavorite';
// import CartPrice from '../CartPrice/CartPrice';
// import CreateCondition from '../CreateCondition/CreateCondition';
// import ProductDescription from '../ProductDescription/ProductDescription';
// import { toggleFavorite } from '../../../redux/features/favoritesSlice';
// import scss from './Card.module.scss';

// const Card = ({
//   product,
//   owners,
//   favorites,
//   exchangeRate,
//   onToggleDescription,
//   showDescriptions,
//   onAddToCart,
//   isInCart,
//   handleOwnerClick,
//   loadingOwner,
//   loading
// }) => {
//   if (loading) {
//     return (
//       <li className={scss.productItem}>
//         <div className={scss.product}>
//           <div className={scss.productImage}>
//             <Skeleton
//               variant="rectangular"
//               width="100%"
//               height={118}
//               animation="pulse"
//             />
//           </div>
//           <div className={scss.productInfo}>
//             <Skeleton variant="text" width="100%" animation="pulse" />
//             <Skeleton variant="text" width="80%" animation="pulse" />
//             <Skeleton variant="text" width="60%" animation="pulse" />
//             <Skeleton variant="text" width="100%" animation="pulse" />
//           </div>
//         </div>
//       </li>
//     );
//   }

//   const {
//     _id,
//     name,
//     description,
//     createdAt,
//     condition,
//     price,
//     image1,
//     owner,
//     views,
//     PLZ,
//     city
//   } = product;

//   const ownerData = owners[owner];

//   return (
//     <li key={_id} className={scss.productItem}>
//       <div className={scss.product}>
//         <div className={scss.productImage}>
//           <div className={scss.ownerViews}>
//             {ownerData ? (
//               <div
//                 className={scss.ownerContainer}
//                 onClick={() => handleOwnerClick(ownerData._id)}
//               >
//                 <img
//                   src={ownerData.avatarURL}
//                   alt={ownerData.name}
//                   className={scss.avatar}
//                   loading="lazy"
//                 />
//                 <div className={scss.name}>{ownerData.name}</div>
//               </div>
//             ) : (
//               <div className={scss.ownerContainer}>
//                 <Skeleton variant="circular" width={40} height={40} />
//                 <Skeleton variant="text" width={100} />
//               </div>
//             )}
//             <div className={scss.viewsQuantity}>
//               <p>{views ?? 'N/A'}</p>
//               <HiOutlineEye className={scss.icon} />
//             </div>
//           </div>
//           {image1 ? (
//             <img
//               src={image1}
//               alt={name}
//               loading="lazy"
//               className={scss.image}
//             />
//           ) : (
//             <Skeleton
//               variant="rectangular"
//               width="100%"
//               height={118}
//               animation="pulse"
//             />
//           )}
//         </div>
//         <div className={scss.productInfo}>
//           <div>
//             {ownerData ? (
//               <TitleFavorite
//                 name={name}
//                 price={price}
//                 description={description}
//                 image={image1}
//                 city={city}
//                 id={_id}
//                 onFavoriteToggle={() => dispatch(toggleFavorite(_id))}
//                 isFavorite={favorites.includes(_id)}
//               />
//             ) : (
//               <Skeleton variant="text" width="150" />
//             )}
//             <p className={scss.description}>{description}</p>
//           </div>
//           <div className={scss.dateCart}>
//             <div>
//               {createdAt && (
//                 <CreateCondition addedDate={createdAt} condition={condition} />
//               )}
//             </div>
//             <div className={scss.expandButtonContainer}>
//               <button
//                 className={scss.expandButton}
//                 onClick={() => onToggleDescription(_id)}
//               >
//                 {showDescriptions[_id] ? (
//                   <IoChevronUpOutline className={scss.icon} />
//                 ) : (
//                   <RiPlayList2Fill className={scss.icon} />
//                 )}
//               </button>
//             </div>
//             <div>
//               {exchangeRate !== null ? (
//                 <CartPrice
//                   price={price}
//                   exchangeRate={exchangeRate}
//                   onAddToCart={onAddToCart}
//                   isInCart={isInCart}
//                 />
//               ) : (
//                 <Skeleton variant="text" width={80} />
//               )}
//             </div>
//           </div>
//           <ProductDescription
//             show={showDescriptions[_id]}
//             name={name}
//             description={description}
//             PLZ={PLZ}
//             city={city}
//             onToggle={() => onToggleDescription(_id)}
//           />
//         </div>
//       </div>
//     </li>
//   );
// };

// export default Card;
