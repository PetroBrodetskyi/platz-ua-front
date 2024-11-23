import { useState, useEffect, useCallback, useMemo } from 'react';
import SubmitButton from '../../components/SubmitButton';
import axios from 'axios';
import scss from './AdminDashboard.module.scss';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('pending');
  const [owners, setOwners] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchOwner = useCallback(
    async (ownerId) => {
      if (owners[ownerId]) return;
      try {
        const response = await axios.get(
          `https://platz-ua-back.vercel.app/api/users/${ownerId}`
        );
        setOwners((prev) => ({ ...prev, [ownerId]: response.data }));
      } catch (err) {
        console.error('Error fetching owner:', err);
      }
    },
    [owners]
  );

  const updateProductStatus = async (productId, newStatus) => {
    try {
      await axios.patch(
        `https://platz-ua-back.vercel.app/api/products/${productId}`,
        { status: newStatus }
      );
      setProducts((prev) =>
        prev.map((product) =>
          product._id === productId
            ? { ...product, status: newStatus }
            : product
        )
      );
    } catch (err) {
      console.error('Error updating product status:', err);
      setError('Не вдалося оновити статус оголошення.');
    }
  };

  const handleEdit = (productId) => {
    // Логіка редагування (наприклад, відкриття форми або редірект)
    console.log(`Редагувати продукт із ID: ${productId}`);
    // Можна додати навігацію до форми редагування, якщо є:
    // navigate(`/edit-product/${productId}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://platz-ua-back.vercel.app/api/products/public/?all=true'
        );
        const productsData = response.data;
        setProducts(productsData);
        setTotalProducts(productsData.length);

        const uniqueOwnerIds = [
          ...new Set(productsData.map((product) => product.owner))
        ];
        uniqueOwnerIds.forEach(fetchOwner);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [fetchOwner]);

  const filteredProducts = useMemo(
    () =>
      products
        .filter((product) => product.status === filter)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [products, filter]
  );

  if (loading) {
    return <div className={scss.loading}>Завантаження...</div>;
  }

  if (error) {
    return <div className={scss.error}>Помилка: {error}</div>;
  }

  return (
    <div className={scss.container}>
      <h3>Список оголошень</h3>
      <div className={scss.filterContainer}>
        <h4>Загальна кількість оголошень: {totalProducts}</h4>
        <div className={scss.buttons}>
          {['pending', 'approved', 'rejected'].map((status) => (
            <SubmitButton
              key={status}
              onClick={() => setFilter(status)}
              buttonText={
                status === 'pending'
                  ? 'На модерацію'
                  : status === 'approved'
                    ? 'Затверджені'
                    : 'Відхилені'
              }
            />
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p>Немає оголошень з таким статусом.</p>
      ) : (
        <ul className={scss.productList}>
          {filteredProducts.map((product) => (
            <li key={product._id} className={scss.productItem}>
              <h3>{product.name}</h3>
              <div className={scss.productInfo}>
                <div className={scss.imageContainer}>
                  {[1, 2, 3, 4]
                    .map((i) => product[`image${i}`])
                    .filter(Boolean)
                    .map((image, index) => (
                      <div key={index} className={scss.imageWrapper}>
                        <img
                          className={scss.image}
                          src={image}
                          alt={`${product.name} image ${index + 1}`}
                        />
                      </div>
                    ))}
                </div>
                <div className={scss.productDetails}>
                  <h4>Продукт</h4>
                  <p>Ціна: {product.price}</p>
                  <p>Опис: {product.description}</p>
                  <p>Стан: {product.condition}</p>
                  <p>Місто: {product.city}</p>
                  <p>PLZ: {product.PLZ}</p>
                  <p>Статус: {product.status}</p>
                  <p>ID: {product._id}</p>
                  <p>
                    Дата: {new Date(product.createdAt).toLocaleDateString()}{' '}
                    {new Date(product.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  {product.owner && owners[product.owner] && (
                    <div className={scss.ownerInfo}>
                      <h4>Інформація про власника</h4>
                      {owners[product.owner].avatarURL ? (
                        <img
                          src={owners[product.owner].avatarURL}
                          alt={`Аватар ${owners[product.owner].name}`}
                          className={scss.avatar}
                        />
                      ) : (
                        <div className={scss.defaultAvatar}>Без аватара</div>
                      )}
                      <p>Ім'я: {owners[product.owner].name}</p>
                      <p>Email: {owners[product.owner].email}</p>
                      <p>Телефон: {owners[product.owner].phone}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className={scss.statusButtons}>
                {product.status === 'pending' && (
                  <div className={scss.buttons}>
                    <SubmitButton
                      onClick={() =>
                        updateProductStatus(product._id, 'approved')
                      }
                      buttonText="Затвердити"
                    />
                    <SubmitButton
                      onClick={() =>
                        updateProductStatus(product._id, 'rejected')
                      }
                      buttonText="Відхилити"
                    />
                    <SubmitButton
                      onClick={() => handleEdit(product._id)}
                      buttonText="Редагувати"
                    />
                  </div>
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
