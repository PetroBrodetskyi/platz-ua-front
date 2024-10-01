import { createSelector } from 'reselect';

export const selectProducts = (state) => state.products.products;
export const selectFavorites = (state) => state.products.favorites;
export const selectExchangeRate = (state) => state.products.exchangeRate;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;

export const selectProductById = (state, productId) =>
  state.products.products.find((product) => product._id === productId);

export const selectProductsByLocation = createSelector(
  [selectProducts, (state, PLZ, city) => ({ PLZ, city })],
  (products, { PLZ, city }) =>
    products.filter(
      (product) =>
        product.location.PLZ === PLZ && product.location.city === city
    )
);
