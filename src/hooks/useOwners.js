import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserById } from '../redux/features/authSlice';

const useOwners = (products) => {
  const dispatch = useDispatch();
  const [owners, setOwners] = useState(
    () => JSON.parse(localStorage.getItem('owners')) || {}
  );
  const [loadingOwners, setLoadingOwners] = useState({});

  useEffect(() => {
    const fetchOwner = async (ownerId) => {
      if (!owners[ownerId] && !loadingOwners[ownerId]) {
        setLoadingOwners((prev) => ({ ...prev, [ownerId]: true }));
        try {
          const response = await dispatch(fetchUserById(ownerId)).unwrap();
          setOwners((prev) => {
            const updatedOwners = { ...prev, [ownerId]: response };
            localStorage.setItem('owners', JSON.stringify(updatedOwners));
            return updatedOwners;
          });
        } catch (error) {
          console.error('Failed to fetch owner:', error);
        } finally {
          setLoadingOwners((prev) => ({ ...prev, [ownerId]: false }));
        }
      }
    };

    products.forEach(({ owner }) => {
      if (owner) fetchOwner(owner);
    });
  }, [products, owners, loadingOwners, dispatch]);

  return owners;
};

export default useOwners;
