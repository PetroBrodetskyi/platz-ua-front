import React, { useState, useEffect } from 'react';
import axios from 'axios';
import scss from './AdminDashboard.module.scss';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('pending');
  const [owners, setOwners] = useState({});
  const [loadingOwners, setLoadingOwners] = useState({});

  // Функція для отримання даних про власника
  const fetchOwner = async (ownerId) => {
    try {
      if (!owners[ownerId] && !loadingOwners[ownerId]) {
        setLoadingOwners((prev) => ({ ...prev, [ownerId]: true }));
        const response = await axios.get(`https://platz-ua-back.vercel.app/api/users/${ownerId}`);
        setOwners((prev) => ({ ...prev, [ownerId]: response.data }));
        setLoadingOwners((prev) => ({ ...prev, [ownerId]: false }));
      }
    } catch (err) {
      console.error("Error fetching owner:", err);
    }
  };

  // Функція для оновлення статусу продукту
  const updateProductStatus = async (productId, newStatus) => {
    try {
      await axios.patch(`https://platz-ua-back.vercel.app/api/products/${productId}`, {
        status: newStatus
      });
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product._id === productId ? { ...product, status: newStatus } : product
        )
      );
    } catch (err) {
      console.error("Error updating product status:", err);
      setError("Не вдалося оновити статус оголошення.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://platz-ua-back.vercel.app/api/products/public/');
        setProducts(response.data);

        // Отримання даних про власників для всіх продуктів
        const uniqueOwnerIds = [...new Set(response.data.map((product) => product.owner))];
        uniqueOwnerIds.forEach(ownerId => fetchOwner(ownerId));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(product => product.status === filter)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) {
    return <div className={scss.loading}>Завантаження...</div>;
  }

  if (error) {
    return <div className={scss.error}>Помилка: {error}</div>;
  }

  return (
    <div className={scss.container}>
      <h1>Привіт, Адмін!</h1>
      <h2>Список оголошень:</h2>

      <div className={scss.filterButtons}>
        <button onClick={() => setFilter('pending')}>На модерацію</button>
        <button onClick={() => setFilter('approved')}>Затверджені</button>
        <button onClick={() => setFilter('rejected')}>Відхилені</button>
      </div>

      {filteredProducts.length === 0 ? (
        <p>Немає оголошень з таким статусом.</p>
      ) : (
        <ul className={scss.productList}>
          {filteredProducts.map(product => (
            <li key={product._id} className={scss.productItem}>
              <div className={scss.imageContainer}>
                {product.image1 && (
                  <div className={scss.imageWrapper}>
                    <img
                      className={scss.productImage}
                      src={product.image1}
                      alt={`${product.name} image 1`}
                    />
                  </div>
                )}
                {product.image2 && (
                  <div className={scss.imageWrapper}>
                    <img
                      className={scss.productImage}
                      src={product.image2}
                      alt={`${product.name} image 2`}
                    />
                  </div>
                )}
                {product.image3 && (
                  <div className={scss.imageWrapper}>
                    <img
                      className={scss.productImage}
                      src={product.image3}
                      alt={`${product.name} image 3`}
                    />
                  </div>
                )}
                {product.image4 && (
                  <div className={scss.imageWrapper}>
                    <img
                      className={scss.productImage}
                      src={product.image4}
                      alt={`${product.name} image 4`}
                    />
                  </div>
                )}
              </div>
              <h3>{product.name}</h3>
              <p>Ціна: {product.price}</p>
              <p>Опис: {product.description}</p>
              <p>Стан: {product.condition}</p>
              <p>Місто: {product.city}</p>
              <p>PLZ: {product.PLZ}</p>
              <p>Статус: {product.status}</p>
              <p>ID: {product._id}</p>
              <p>Дата розміщення: {new Date(product.createdAt).toLocaleDateString()}</p>
              <p>Час розміщення: {new Date(product.createdAt).toLocaleTimeString()}</p>
              {product.owner && owners[product.owner] && (
                <div className={scss.ownerInfo}>
                  <h4>Інформація про власника:</h4>
                  <p>Ім'я: {owners[product.owner].name}</p>
                  <p>Електронна пошта: {owners[product.owner].email}</p>
                  <p>Телефон: {owners[product.owner].phone}</p>
                </div>
              )}
              {/* Кнопки для затвердження або відхилення оголошень */}
              <div className={scss.statusButtons}>
                {product.status === 'pending' && (
                  <>
                    <button onClick={() => updateProductStatus(product._id, 'approved')}>Затвердити</button>
                    <button onClick={() => updateProductStatus(product._id, 'rejected')}>Відхилити</button>
                  </>
                )}
                {product.status === 'approved' && (
                  <button onClick={() => updateProductStatus(product._id, 'pending')}>Повернути на модерацію</button>
                )}
                {product.status === 'rejected' && (
                  <button onClick={() => updateProductStatus(product._id, 'pending')}>Повернути на модерацію</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
