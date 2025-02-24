import Signup from './components/Signup';
import Login from './components/Login';
import VerifyLogin from './components/VerifyLogin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/verify-login" element={<VerifyLogin />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
