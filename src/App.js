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
    <GoogleOAuthProvider clientId="865555904435-cipjskg0onhkv685uqve4dljlh7s1cvv.apps.googleusercontent.com">
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        <Router />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
