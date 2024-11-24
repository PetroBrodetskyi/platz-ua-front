import { useState } from 'react';
import axios from 'axios';
import OwnerInfo from '../OwnerInfo';
import SubmitButton from '../../SubmitButton';
import scss from '../AdminDashboard.module.scss';

const ProductItem = ({
  product,
  owner,
  updateProductStatus,
  deleteProduct
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    city: product.city,
    PLZ: product.PLZ
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
      PLZ: product.PLZ
    });
    setIsEditing(false);
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
              {['price', 'description', 'city', 'PLZ'].map((field) => (
                <label key={field}>
                  {field === 'price'
                    ? 'Ціна:'
                    : field === 'description'
                      ? 'Опис:'
                      : field === 'city'
                        ? 'Місто:'
                        : 'PLZ:'}
                  <input
                    type={field === 'price' ? 'number' : 'text'}
                    name={field}
                    value={editedProduct[field]}
                    onChange={handleInputChange}
                    className={
                      field === 'description' ? scss.textarea : scss.input
                    }
                  />
                </label>
              ))}
            </>
          ) : (
            <>
              <p>Ціна: {product.price}</p>
              <p>Опис: {product.description}</p>
              <p>Місто: {product.city}</p>
              <p>PLZ: {product.PLZ}</p>
            </>
          )}
          <p>Статус: {product.status}</p>
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
              onClick={() => updateProductStatus(product._id, 'rejected')}
              buttonText="Відхилити"
            />
            <SubmitButton
              onClick={() => setIsEditing(true)}
              buttonText="Редагувати"
            />
            <SubmitButton
              onClick={() => deleteProduct(product._id)}
              buttonText="Видалити"
            />
          </div>
        )}
      </div>
    </li>
  );
};

export default ProductItem;