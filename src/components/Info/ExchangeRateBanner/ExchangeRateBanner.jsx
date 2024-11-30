import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@mui/material';
import { fetchExchangeRate } from '../../../redux/features/productsSlice';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { RiExternalLinkLine } from 'react-icons/ri';
import privatLogo from '../../../assets/images/logo_PrivatBank.png';
import scss from './ExchangeRateBanner.module.scss';

const ExchangeRateBanner = () => {
  const dispatch = useDispatch();
  const exchangeRate = useSelector((state) => state.products.exchangeRate);
  const loading = useSelector((state) => state.products.loading);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    dispatch(fetchExchangeRate());
  }, [dispatch]);

  const handleBannerClick = () => {
    window.open('https://privatbank.ua/rates-archive', '_blank');
  };

  return (
    <div
      className={`${scss.banner} ${isDarkMode ? scss.darkMode : ''}`}
      onClick={handleBannerClick}
      role="button"
    >
      <div className={scss.logoContainer}>
        <img src={privatLogo} alt="PrivatBank Logo" className={scss.logo} />
        <RiExternalLinkLine className={scss.icon} />
      </div>
      {loading ? (
        <div className={scss.skeletonContainer}>
          <Skeleton variant="text" width={120} height={28} />
          <Skeleton variant="text" width={80} height={28} />
        </div>
      ) : (
        <div className={scss.rate}>
          <h4>Курс валют EUR - UAH</h4>
          <p className={scss.value}>{exchangeRate} грн</p>
        </div>
      )}
    </div>
  );
};

export default ExchangeRateBanner;
