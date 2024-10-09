import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import scss from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={scss.notFoundPage}>
      <h1>404 - Сторінка не знайдена</h1>
      <Logo />
      <p>На жаль, ми не змогли знайти цю сторінку.</p>
      <Link to="/">Повернутися на головну</Link>
    </div>
  );
};

export default NotFoundPage;
