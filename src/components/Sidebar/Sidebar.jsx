import SidebarCart from './SidebarCart/SidebarCart';
import scss from './Sidebar.module.scss';

const Sidebar = ({ cartItems, selectedProducts, handleRemoveFromCart, handleProductClick }) => {
  return (
      <div className={scss.cartSidebar}>
        <h3>Кошик</h3>
      <SidebarCart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />
      <div className={scss.cartItems}>
      </div>
      
      <div className={scss.divider}></div>

        <h3 className={scss.subtitle}>Обрані</h3>
      <div className={scss.selectedProducts}>
        {selectedProducts.length ? (
          selectedProducts.map((product) => (
            <div key={product._id} className={scss.selectedProduct}>
              <p>{product.name}</p>
              <button className={scss.viewButton} onClick={() => handleProductClick(product._id)}>Переглянути</button>
            </div>
          ))
        ) : (
          <p className={scss.emptySelection}>Немає обраних продуктів</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
