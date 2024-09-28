import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../../redux/features/authSlice";
import {
  fetchUserProducts,
  fetchUsersPublicProducts,
} from "../../redux/features/productsSlice";
import CreateAdButton from "../../components/CreateAdButton/CreateAdButton";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import UserProducts from "../../components/UserProducts/UserProducts";
import scss from "./UserProductsPage.module.scss";

const UserProductsPage = () => {
  const { userId } = useParams();
  const [products, setProducts] = useState([]);
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

  const isCurrentUser = currentUser && currentUser._id === userId;

  return (
    <div className={scss.userPage}>
      {user ? (
        <div className={scss.productsProfileContainer}>
          <UserProducts products={products} setProducts={setProducts} />
          <CreateAdButton />
          {isCurrentUser && <ProfileButton />}
        </div>
      ) : (
        <p>Завантаження даних...</p>
      )}
    </div>
  );
};

export default UserProductsPage;
