import { createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchExchangeRate,
  toggleFavorite,
} from "../../redux/features/productsSlice";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const favorites = useSelector((state) => state.products.favorites);
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchExchangeRate());
  }, [dispatch]);

  return (
    <ProductContext.Provider
      value={{
        products,
        favorites,
        exchangeRate,
        status,
        error,
        toggleFavorite,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
