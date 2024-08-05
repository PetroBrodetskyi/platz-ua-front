import React, { useState, useEffect } from 'react';
import axios from 'axios';
import scss from './AdminDashboard.module.scss';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Отримання оголошень для модерації
    axios.get('/api/admin/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));

    // Отримання статистики користувачів
    axios.get('/api/admin/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleStatusChange = async (id, status) => {
  setLoading(true);
  try {
    await axios.patch(`/api/admin/products/${id}`, { status });
    setProducts(products.map(product => 
      product._id === id ? { ...product, status } : product
    ));
  } catch (error) {
    console.error('Error updating status:', error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={scss.dashboard}>
      <h1>Admin Dashboard</h1>
      <h2>Products for Approval</h2>
      {products.map(product => (
        <div key={product._id}>
          <p>{product.name}</p>
          <button onClick={() => handleStatusChange(product._id, 'approved')}>Approve</button>
          <button onClick={() => handleStatusChange(product._id, 'rejected')}>Reject</button>
        </div>
      ))}
      <h2>User Statistics</h2>
      {users.map(user => (
        <div key={user._id}>
          <p>{user.name}: {user.listedProductsCount} ads</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
