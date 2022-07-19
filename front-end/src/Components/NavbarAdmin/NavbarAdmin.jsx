import { Link } from "react-router-dom";
import './navbarAdmin.css';

const NavbarAdmin = () => {
    return ( 
        <div className="navbar-container">
            <ul className="navbar-list">
                <li className="navbar-item"><Link to="/">DashBoad</Link></li>
                <li className="navbar-item"><Link to="/product">Product</Link></li>
                <li className="navbar-item"><Link to="/customer">Customer</Link></li>
                <li className="navbar-item"><Link to="/category">Category</Link></li>
                <li className="navbar-item"><Link to="/order">Order</Link></li>
            </ul>
        </div>
     );
}
 
export default NavbarAdmin;