import { useState } from 'react';
import { Confirmation } from '../../Confirmation/Confirmation';
import axios from 'axios';
import OwnerInfo from '../OwnerInfo';
import SubmitButton from '../../SubmitButton';
import scss from './ProductItem.module.scss';

const statuses = ['pending', 'approved', 'rejected', 'vip', 'archive'];

const ProductItem = ({
  product,
  owner,
  updateProductStatus,
  deleteProduct
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    city: product.city,
    PLZ: product.PLZ,
    status: product.status
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    const fieldsToUpdate = Object.keys(editedProduct).reduce((acc, key) => {
      if (editedProduct[key] !== product[key]) {
        acc[key] = editedProduct[key];
      }
      return acc;
    }, {});

    if (!Object.keys(fieldsToUpdate).length) {
      setError('Немає змін для збереження.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Авторизуйтеся, щоб зберегти зміни.');
        return;
      }

      await axios.patch(
        `https://platz-ua-back.vercel.app/api/products/${product._id}`,
        fieldsToUpdate,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setIsEditing(false);
      setError('');
    } catch (err) {
      console.error('Error saving changes:', err);
      setError('Помилка при збереженні змін.');
    }
  };

  const cancelEditing = () => {
    setEditedProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      city: product.city,
      PLZ: product.PLZ,
      status: product.status
    });
    setIsEditing(false);
  };

  const confirmDelete = () => {
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteProduct(product._id);
    setIsConfirmOpen(false);
  };

  return (
    <li className={scss.productItem}>
      <div className={scss.productHeader}>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
            placeholder="Назва"
            className={scss.input}
          />
        ) : (
          <h3>{product.name}</h3>
        )}
        <p className={scss.date}>
          Розміщено {new Date(product.createdAt).toLocaleDateString()}{' '}
          {new Date(product.createdAt).toLocaleTimeString()}
        </p>
      </div>
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
          {isEditing ? (
            <>
              <input
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                placeholder="Ціна (€)"
                className={scss.input}
              />
              <textarea
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                placeholder="Опис"
                className={scss.textarea}
              />
              <input
                type="text"
                name="city"
                value={editedProduct.city}
                onChange={handleInputChange}
                placeholder="Місто"
                className={scss.input}
              />
              <input
                type="text"
                name="PLZ"
                value={editedProduct.PLZ}
                onChange={handleInputChange}
                placeholder="PLZ"
                className={scss.input}
              />
              <select
                name="status"
                value={editedProduct.status}
                onChange={handleInputChange}
                className={scss.select}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <p>Ціна: {product.price} €</p>
              <p>Опис: {product.description}</p>
              <p>Місто: {product.city}</p>
              <p>PLZ: {product.PLZ}</p>
              <p>Статус: {product.status}</p>
            </>
          )}
          <p>ID: {product._id}</p>
        </div>
        {owner && <OwnerInfo owner={owner} />}
      </div>
      {error && <p className={scss.error}>{error}</p>}
      <div className={scss.statusButtons}>
        {isEditing ? (
          <div className={scss.buttons}>
            <SubmitButton onClick={saveChanges} buttonText="Зберегти" />
            <SubmitButton onClick={cancelEditing} buttonText="Скасувати" />
          </div>
        ) : (
          <div className={scss.buttons}>
            <SubmitButton
              onClick={() => updateProductStatus(product._id, 'approved')}
              buttonText="Затвердити"
            />
            <SubmitButton
              onClick={() => setIsEditing(true)}
              buttonText="Редагувати"
            />
            <SubmitButton onClick={confirmDelete} buttonText="Видалити" />
          </div>
        )}
      </div>
      {isConfirmOpen && (
        <Confirmation
          message="Ви впевнені, що хочете видалити цей продукт?"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}
    </li>
  );
};

export default ProductItem;
