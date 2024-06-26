import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import './styles/index.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppBar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
