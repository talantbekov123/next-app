import { DefaultTheme, ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global';
import usePersistedState from '../utils/usePersistedState';
import dark from '../styles/themes/dark';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  const [theme] = usePersistedState<DefaultTheme>('theme', dark);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <ToastContainer />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;
