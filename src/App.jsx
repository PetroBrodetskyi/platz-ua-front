import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import AppBar from './components/AppBar/AppBar';
import store from './redux/store';
import './styles/index.scss';

const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AppBar />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
