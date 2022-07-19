import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './productCart.css';

const ProductCart = (props) => {
    const { title, price, size, image } = props;
    return ( 
        <>
            <section className="dog-cart-container">
                <div className="dog-img">
                    <Link to="/dog-info">
                        <img src={`http://127.0.0.1:5000/public/images/${image}`} alt={title}/>
                    </Link>
                </div>
                <div className="dog-info">
                    <Link to="/dog-info" className="dog-title">{title}</Link>
                </div>
                <div className="dog-price-breed">
                    <Link to="/dog-info" className="dog-price">Price: {price} VND</Link>
                    <Link to="/dog-info" className="dog-breed">Size: {size}</Link>
                </div>
                <div className="add-buy">
                    <AddShoppingCartIcon className="add-cart" />
                    <button className="buy-now">BUY NOW</button>
                </div>
            </section>
        </>
     );
}
 
export default ProductCart;