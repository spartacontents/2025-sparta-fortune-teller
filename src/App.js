import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Counseling from './components/Counseling';

function App() {
  return <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/counseling" element={<Counseling />} />
    </Routes>
  </Router>
}

export default App;
