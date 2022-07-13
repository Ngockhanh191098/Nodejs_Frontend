import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgotPass from "./Pages/ForgotPass";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/forgot-password' element={<ForgotPass />}/>
      </Routes>
    </Router>
  );
}

export default App;
