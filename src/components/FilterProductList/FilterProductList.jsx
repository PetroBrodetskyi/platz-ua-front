// import { useState, useEffect } from 'react';
// import FilterProductCard from '../FilterProductCard';
// import scss from '../ProductList/ProductList.module.scss';
// import ViewToggle from '../ProductList/ViewToggle';

// const FilterProductList = () => {
//   const [viewMode, setViewMode] = useState('grid');

//   useEffect(() => {
//     const savedViewMode = localStorage.getItem('viewMode');
//     if (savedViewMode) {
//       setViewMode(savedViewMode);
//     }
//   }, []);

//   const handleViewModeChange = (mode) => {
//     setViewMode(mode);
//     localStorage.setItem('viewMode', mode);
//   };

//   return (
//     <div className={scss.productListWrapper}>
//       <div className={`${scss.productList} ${scss[viewMode]}`}>
//         <div className={scss.header}>
//           <h3 className={scss.title}>Знайдено</h3>
//           <ViewToggle viewMode={viewMode} setViewMode={handleViewModeChange} />
//         </div>
//         <div className={scss.container}>
//           <FilterProductCard viewMode={viewMode} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterProductList;
