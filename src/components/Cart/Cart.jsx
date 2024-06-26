import React, { useState } from 'react';
import scss from './Cart.module.scss';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: '$100', quantity: 1 },
    { id: 2, name: 'Product 2', price: '$200', quantity: 2 },
  ]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, delta) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item
    ));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.price.slice(1)) * item.quantity), 0).toFixed(2);
  };

  return (
    <div className={scss.cart}>
      <h2>Shopping Cart</h2>
      <ul className={scss.cartItems}>
        {cartItems.map(item => (
          <li key={item.id} className={scss.cartItem}>
            <span>{item.name}</span>
            <span>{item.price}</span>
            <div className={scss.quantityControl}>
              <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
            </div>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className={scss.total}>
        Total: ${getTotalPrice()}
      </div>
    </div>
  );
};

export default Cart;
