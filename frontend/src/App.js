import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <Container>
      <Router>
        <Route path='/' component={HomeScreen} />
      </Router>
    </Container>
  );
}

export default App;
