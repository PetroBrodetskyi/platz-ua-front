import { memo } from "react";
import { removeFromCart } from "../../../redux/features/cartSlice";
import SidebarCartItem from "../SidebarCartItem/SidebarCartItem";
import { TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Collapse } from "@mui/material";
import scss from "./SidebarCart.module.scss";

const SidebarCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className={scss.sidebarCart}>
      {cartItems.length === 0 ? (
        <p>Ваш кошик порожній</p>
      ) : (
        <ul className={scss.cartList}>
          <TransitionGroup className={scss.list}>
            {cartItems.map((item) => (
              <Collapse key={item._id} timeout={500}>
                <SidebarCartItem
                  item={item}
                  onRemove={handleRemoveFromCart}
                  onProductClick={handleProductClick}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </ul>
      )}
    </div>
  );
};

export default memo(SidebarCart);
