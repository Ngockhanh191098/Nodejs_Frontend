import './header.css';
import React from 'react';
import Logo from '../../images/logo1.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavbarCustomer from '../Navbar/Navbar';

const Header = () => {

    const navigate = useNavigate();
    const avatar = localStorage.getItem('avatar');
    const username = localStorage.getItem("username");
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("avatar");
        localStorage.removeItem("username");
        alert("Logout Successfully!");
        return navigate('/');
    }

    return ( 
        <div className='header-container'>
            <Link to ='/' className='header-logo'>
                <img src={Logo} alt={Logo} />
            </Link>
            <NavbarCustomer />
            <div className='search-header'>
                <input type="text" placeholder='Search product...'/>
                <SearchIcon className='search-icon'/>
            </div>
                <Link className='header-cart' to='/cart'><ShoppingCartIcon className='cart-item'/></Link>
            {(username) ? (
                <div className='header-account'>
                    <div className='account-info'>
                        <img src={`http://127.0.0.1:5000/public/images/${avatar}`} alt={avatar} />
                        <Link to="/info-user" className='username'>{username}</Link>
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