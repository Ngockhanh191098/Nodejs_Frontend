import './header.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Logo from '../../images/logo1.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavbarCustomer from '../Navbar/Navbar';
import axios from 'axios';
// import CartContext from '../../Contexts/CartContext';
// import UserContext from '../../Contexts/UserContext';
import { toast } from 'react-toastify';



const Header = (props) => {

    // const {  numberBadge } = useContext(CartContext)
    const {setIdCategory, setSearchKey} = props;
    const [listCategory, setListCategory] = useState([]);
    const avatar = localStorage.getItem('avatar');
    const username = localStorage.getItem("username");
    const idUser = localStorage.getItem('idUser');
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logout Successfully!");
        return navigate('/');
    }
    useEffect(() => {
        axios.get(
            "http://127.0.0.1:5000/api/v1/category"
        )
        .then(res => {
            setListCategory(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    },[]);


    

    const handleSearch = () => {
        return navigate('/search');
    }

    return (
        <div className='header-container'>
            <Link to ='/' className='header-logo'>
                <img src={Logo} alt={Logo} />
            </Link>
            <NavbarCustomer listCategory={listCategory} setIdCategory={setIdCategory} className="list-category-customer"/>
            <div className='search-header'>
                <input 
                    type="text" 
                    placeholder='Search product...'
                    onChange={(e) => setSearchKey(e.target.value)}    
                />
                <SearchIcon className='search-icon' onClick={handleSearch}/>
            </div>
            {(idUser) ? (
                <div className='cart-item'>
                    <Link className='header-cart' to='/cart'><ShoppingCartIcon className='cart-item' /></Link>
                </div>
            ) : (
                <div className='cart-item'>
                    <Link className='header-cart' to='/login'><ShoppingCartIcon className='cart-item'/></Link>
                </div>
            )}
            {(username) ? (
                <div className='header-account'>
                    <div className='account-info'>
                        <img src={`http://127.0.0.1:5000/public/images/${avatar}`} alt="avatar" />
                        <Link to="/manager-account" className='username'>{username}</Link>
                    </div>
                    <div className='manager-account'>
                        <p><Link to='/manager-account' className='my-account'>My Account</Link></p>
                        <p><Link to='/' onClick={handleLogout} className='my-account'>Logout</Link></p>
                    </div>
                </div>
            ) : (<>
                <div className='header-account'>
                    <Link to="/login" className='account-item'>LOGIN</Link>
                    <Link to="/register" className='account-item'>REGISTER</Link>
                </div>
            </>)}
            
        </div>
     );
}
 
export default Header;