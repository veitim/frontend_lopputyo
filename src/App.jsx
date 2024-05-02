import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './components/Navigation';
import CustomerList from './components/CustomerList';

function App() {

  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <Navigation />
    </Container>
  );
}

export default App;
