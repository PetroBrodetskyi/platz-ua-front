import { useState, useEffect, useCallback, useMemo } from 'react';
import FilterButtons from '../AdminDashboard/FilterButtons';
import ProductList from '../AdminDashboard/ProductList';
import axiosInstance from '../../redux/axiosConfig';
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
        const response = await axiosInstance.get(`/users/${ownerId}`);
        setOwners((prev) => ({ ...prev, [ownerId]: response.data }));
      } catch (err) {
        console.error('Error fetching owner:', err);
      }
    },
    [owners]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products/public/?all=true');
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

  const updateProductStatus = async (productId, newStatus) => {
    try {
      await axiosInstance.patch(`/products/${productId}`, {
        status: newStatus
      });
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
    console.log(`Редагувати продукт із ID: ${productId}`);
  };

  const deleteProduct = async (productId) => {
    try {
      await axiosInstance.delete(`/products/${productId}`);
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
      setTotalProducts((prev) => prev - 1);
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Не вдалося видалити оголошення.');
    }
  };

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
        <FilterButtons filter={filter} setFilter={setFilter} />
      </div>
      <ProductList
        products={filteredProducts}
        owners={owners}
        updateProductStatus={updateProductStatus}
        handleEdit={handleEdit}
        deleteProduct={deleteProduct}
      />
    </div>
  );
};

export default AdminDashboard;
