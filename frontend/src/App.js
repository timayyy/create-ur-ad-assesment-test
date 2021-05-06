import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import CreateScreen from './screens/CreateScreen'

import Header from './components/Header'
import UpdateScreen from "./screens/UpdateScreen";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container>

          {/* <Route path='/search/' component={HomeScreen} /> */}
          <Route path='/update/:id' component={UpdateScreen} />
          <Route path='/create' component={CreateScreen} exact />
          <Route path='/' component={HomeScreen} exact />

        </Container>
      </Router>
    </>
  );
}

export default App;
