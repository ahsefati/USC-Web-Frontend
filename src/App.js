import { GoogleOAuthProvider } from '@react-oauth/google';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <GoogleOAuthProvider clientId="677411199708-ntlvk2np3fidie6u6keknhl0942kqr72.apps.googleusercontent.com">
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        <Router />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
