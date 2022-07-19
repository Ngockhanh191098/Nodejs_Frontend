import { Link } from "react-router-dom";
import Logo from "../../images/logo1.png";
import './headerAdmin.css';
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import UserContext from "../../Contexts/UserContext";
import { useContext } from "react";

const HeaderAdmin = () => {
    const { setRole } = useContext(UserContext);
    let navigate = useNavigate();
    const username = localStorage.getItem('username');
    const avatar = localStorage.getItem('avatar');
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('avatar');
        setRole("");
        alert('Logout success');
        return navigate('/')
    }

    return ( 
        <>
            {username ? (
            <div className="header-admin-container">
            <div className="logo-admin">
                <Link to="/"><img src={Logo} alt={Logo}/></Link>
            </div>
            <h2>ADMIN PAGE</h2>
            <div className="admin-account">
                <img src={`http://127.0.0.1:5000/public/images/${avatar}`} alt={avatar} />
                <Link to="/info-user" className='username'>{username}</Link>
                <div className='manager-account-admin'>
                        <p><Link to='/info-user' className='my-account'>My Account</Link></p>
                        <p><Link to='/' onClick={handleLogout} className='my-account'>Logout</Link></p>
                </div>
            </div>
        </div>
        ) : (
            <Header />
        )}
        </>
     );
}
 
export default HeaderAdmin;