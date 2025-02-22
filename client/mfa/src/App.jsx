import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signup />}/>

        </Routes>
      </div>
    </Router>
  )
}

export default App
