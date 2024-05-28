import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found | Minimal UI </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>

          <Box onClick={()=>{window.location="https://USC: TrajDash.netlify.app"}} sx={{ px: 2.5, py: 3, display: 'inline-flex', width:'80%', cursor:'pointer' }} component={"img"} src="/assets/usc-shield.webp"/>
          <Typography variant="h3" paragraph>
            Sorry! Page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            We couldn’t find the page you’re looking for. Make sure to check your
            spelling. If you spelled it right, it's our fault :)
            <br/> <br/>
            Contact me via email: ahsefati1998@gmail.com
          </Typography>

          <Button sx={{my:{xs:2, sm:4}}} to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
