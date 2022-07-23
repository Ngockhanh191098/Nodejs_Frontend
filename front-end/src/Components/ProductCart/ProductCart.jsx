import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './productCart.css';
import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";

const ProductCart = (props) => {
    const {setIdProduct} = useContext(UserContext)
    const {id, title, price, size, image } = props;

    const handleAddCart = (id) => {
        setIdProduct(id)
    }

    const getIdProduct = (id) => {
        setIdProduct(id)
    }

    return ( 
        <>
            <section className="dog-cart-container">
                <div className="dog-img">
                    <Link to="/product-detail" onClick={() => getIdProduct(id)}>
                        <img src={`http://127.0.0.1:5000/public/images/${image}`} alt={title}/>
                    </Link>
                </div>
                <div className="dog-info" onClick={() => getIdProduct(id)}>
                    <Link to="/product-detail" className="dog-title">{title}</Link>
                </div>
                <div className="dog-price-breed" onClick={() => getIdProduct(id)}>
                    <Link to="/product-detail" className="dog-price">Price: {price} VND</Link>
                    <Link to="/product-detail" className="dog-breed">Size: {size}</Link>
                </div>
                <div className="add-buy">
                    <AddShoppingCartIcon className="add-cart" onClick={() => handleAddCart(id)}/>
                    <button className="buy-now">BUY NOW</button>
                </div>
            </section>
        </>
     );
}
 
export default ProductCart;