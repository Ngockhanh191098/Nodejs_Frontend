import './header.css';
import React, { useContext, useEffect, useState } from 'react';
import Logo from '../../images/logo1.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavbarCustomer from '../Navbar/Navbar';
import axios from 'axios';
import CartContext from '../../Contexts/CartContext';



const Header = (props) => {
    const {setIdCategory, setSearchKey} = props;
    const [items, setItems] = useState(0);
    const [listCategory, setListCategory] = useState([])
    const avatar = localStorage.getItem('avatar')
    const username = localStorage.getItem("username");
    const idUser = localStorage.getItem('idUser');
    const navigate = useNavigate();

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

        if (idUser) {
            axios.get(
                `http://127.0.0.1:5000/api/v1/cart/${idUser}`,{
                    headers: {
                        "Content-Type": "Application/json",
                        "x-access-token": localStorage.getItem('token')
                        }
            })
            .then(res => {
                setItems(res.data.countItem);
            })
            .catch(err => {
                console.log(err.response.data.message);
            })
        }
    },[listCategory,items]);


    const handleLogout = () => {
        localStorage.clear();
        alert("Logout Successfully!");
        return navigate('/');
    }

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
            <div className='cart-item'>
                <Link className='header-cart' to='/cart'><ShoppingCartIcon className='cart-item'/></Link>
                <span className='cart-quantity'>{items}</span>
            </div>
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