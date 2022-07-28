import { Link, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './productCart.css';
import axios from "axios";
import { toast } from "react-toastify";

const ProductCart = (props) => {
    const {id, title, price, size, image } = props;
    const idUser = localStorage.getItem('idUser');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const handleAddCart = (id) => {
        if(!username) {
            return navigate('/login')
        }
        const data = {
            idProduct: id
        }
        axios.post(
            `http://127.0.0.1:5000/api/v1/cart/${idUser}`,data,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                    }
        })
        .then(res => {
            toast.success(res.data.message);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleBuyProduct = () => {
        if(!username) {
            return navigate('/login')
        }
        return navigate('/checkout')
    }

    return ( 
        <>
            <section className="dog-cart-container">
                <div className="dog-img">
                    <Link to={`/product-detail/${id}`}>
                        <img src={`http://127.0.0.1:5000/public/images/${image}`} alt={title}/>
                    </Link>
                </div>
                <div className="dog-info">
                    <Link to={`/product-detail/${id}`} className="dog-title">{title}</Link>
                </div>
                <div className="dog-price-breed">
                    <Link to={`/product-detail/${id}`} className="dog-price">Price: {price} VND</Link>
                    <Link to={`/product-detail/${id}`} className="dog-breed">Size: {size}</Link>
                </div>
                <div className="add-buy">
                    <AddShoppingCartIcon className="add-cart" onClick={() => handleAddCart(id)}/>
                    <button className="buy-now" onClick={handleBuyProduct}>BUY NOW</button>
                </div>
            </section>
        </>
     );
}
 
export default ProductCart;