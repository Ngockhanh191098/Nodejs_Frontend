import axios from "axios";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import './cart.css';

const Cart = () => {
    // const {listCart, setListCart} = useContext(CartContext);
    const [listProduct, setListProduct] = useState([]);
    const idUser = localStorage.getItem("idUser");
    const [defaultQuantity, setDefaultQuantity] = useState(1);
    useEffect(() => {
        if (idUser) {
            axios.get(
                `http://127.0.0.1:5000/api/v1/cart/${idUser}`,{
                    headers: {
                        "Content-Type": "Application/json",
                        "x-access-token": localStorage.getItem('token')
                    }
            })
            .then(res => {
                setListProduct(res.data.items || []);
            })
            .catch(err => {
                console.log(err.response.data.message);
            })
        }    
    },[listProduct]);

    const handleDelete = (id) => {
        axios.delete(
            `http://127.0.0.1:5000/api/v1/cart/${id}`,{
                headers: {
                    "Content-Type": "Application/json",
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then(res => {
            alert(res.data.message);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return ( 
        <div className="product-cart-container">
                <div className="product-cart">
                {listProduct.map((product) => {
                return (
                        <div className="product-cart-info"  key={product.cartId}>
                            <div className="cart-procduct-image">
                                <img src={`http://127.0.0.1:5000/public/images/${product.image}`} alt={product.title} />
                            </div>
                            <div className="product-cart-title">
                                <h4>Title</h4>
                                <p>{product.title}</p>
                            </div>
                            <div className="product-cart-price">
                                <h4>Price</h4>
                                <p>{product.price}</p>
                            </div>
                            <div className="product-cart-size">
                                <h4>Size</h4>
                                <p>{product.size}</p>
                            </div>
                            <div className="product-cart-quantity">
                                <h4>Quantity</h4>
                                <input type="number" value={defaultQuantity}/>
                            </div>
                            <div className="product-cart-delete">
                                <DeleteIcon onClick={() => handleDelete(product.cartId)}/>
                            </div>
                        </div>
                )
              })}  
                </div>
            <div className="product-cart-action">
                <button>Check Out</button>
            </div>
        </div>
     );
}
 
export default Cart;
