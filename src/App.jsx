import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppBar from './components/AppBar/AppBar';
import store from './redux/store';
import './styles/index.scss';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <Provider store={store}>
          <BrowserRouter>
            <AppBar />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
