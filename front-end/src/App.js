import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Home from './Components/pages/Home/Home';
import Login from './Components/pages/Login/Login';
import Register from './Components/pages/Register/Register';
import Footer from './Components/Footer/Footer';
import ProductManager from "./Components/pages/ProductManager/ProductManager";
import Customer from "./adminPage/adminPages/Customer/Customer";
import Category from "./adminPage/adminPages/Category/Category";
import Order from "./adminPage/adminPages/Order/Order";
import UserContext from './Contexts/UserContext';
import { useState } from "react";
import HeaderAdmin from "./Components/HeaderAdmin/HeaderAdmin";
import Header from "./Components/Header/Header";
import NavbarAdmin from "./Components/NavbarAdmin/NavbarAdmin";
import Shirt from "./Components/pages/Shirt/Shirt";
const App = () => {
    const [role, setRole] = useState("member");
    const isAdmin = localStorage.getItem('role');

    return ( 
        <UserContext.Provider value={{setRole, isAdmin}}>
            <Router>
                {(isAdmin === 'admin') ? (
                        <>
                            <HeaderAdmin />
                            <NavbarAdmin />
                        </>
                ) : (
                    <>
                        <Header />
                        <></>
                    </>
                )}

                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/product' element={<ProductManager />}></Route>
                    <Route path='/customer' element={<Customer />}></Route>
                    <Route path='/category' element={<Category />}></Route>
                    <Route path='/order' element={<Order />}></Route>
                    <Route path='/shirt' element={<Shirt />}></Route>
                </Routes>
                <Footer />
            </Router>
        </UserContext.Provider>
     );
}
 
export default App;