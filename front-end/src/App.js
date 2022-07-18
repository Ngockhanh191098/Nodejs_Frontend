import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
  import Header from './Components/Header/Header';
  import Home from './Components/pages/Home/Home';
  import Login from './Components/pages/Login/Login';
  import Register from './Components/pages/Register/Register';
  import Footer from './Components/Footer/Footer';
  import AdminHome from "./adminPage/adminPages/AdminHome/AdminHome";
import HeaderAdmin from "./adminPage/components/HeaderAdmin/HeaderAdmin";
import NavbarAdmin from "./adminPage/components/NavbarAdmin/NavbarAdmin";
import Product from "./adminPage/adminPages/Product/Product";
import Customer from "./adminPage/adminPages/Customer/Customer";
import Category from "./adminPage/adminPages/Category/Category";
import Order from "./adminPage/adminPages/Order/Order";
const App = () => {

    const isAdmin = localStorage.getItem("role");

    return ( 
        <>
         {(isAdmin === "admin") ? (
                <Router>
                <HeaderAdmin />
                <NavbarAdmin />
                    <Routes>
                        <Route path='/' element={<AdminHome />}></Route>
                        <Route path='/product' element={<Product />}></Route>
                        <Route path='/customer' element={<Customer />}></Route>
                        <Route path='/category' element={<Category />}></Route>
                        <Route path='/order' element={<Order />}></Route>
                    </Routes>
                </Router>
            ) : (
            <Router>
            <Header />
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                </Routes>
            <Footer />
            </Router>
        )}
        </>
     );
}
 
export default App;