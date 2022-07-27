import axios from "axios";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import './cart.css';
import { toast } from "react-toastify";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DoDisturbOnRoundedIcon from '@mui/icons-material/DoDisturbOnRounded';

const Cart = () => {
    const idUser = localStorage.getItem("idUser");
    const [defaultQuantity, setDefaultQuantity] = useState(1);
    const [listProductInCart, setListProductInCart] = useState([]);
    const [count, setCount] = useState(0);
    const arrIdProduct = [];
    const [arr,setArr] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    // console.log(arr);
    
    const handleDelete = (idProduct) => {
        axios.delete(
            `http://127.0.0.1:5000/api/v1/cart/${idProduct}`,{
                headers: {
                    "Content-Type": "Application/json",
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then(res => {
            toast.success(res.data.message);
            setIsDelete(!isDelete);
        })
        .catch(err => {
            toast.error(err.response.data.message);
        })
    }
    
    useEffect(() => {
            axios.get(
                `http://127.0.0.1:5000/api/v1/cart/${idUser}`,{
                    headers: {
                        "Content-Type": "Application/json",
                        "x-access-token": localStorage.getItem('token')
                        }
            })
            .then(res => {
                setListProductInCart(res.data.items || []);
            })
            .catch(err => {
                console.log(err.response.data.message);
            })
    },[isDelete]);

    const handleChange = (e,id) => {
        setDefaultQuantity(e.target.value)
    }

    if(defaultQuantity === 0) {
        setDefaultQuantity(1);
    }

    const handleDown = () => {
        setDefaultQuantity(defaultQuantity - 1);
    }

    const handleUp = (id) => { 
        setDefaultQuantity(defaultQuantity + 1);
    };


    return ( 
        <div className="product-cart-container">
                <div className="product-cart">
                {listProductInCart.map((product) => {
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
                                <div className="quantity-change">
                                <DoDisturbOnRoundedIcon  className="product-up-down" onClick={() => handleDown(product.cartId)}/>
                                    <input 
                                        type="text" 
                                        maxLength={3} 
                                        value={defaultQuantity} 
                                        onChange={() => handleChange(product.id)}
                                    />
                                    <ControlPointIcon className="product-up-down" onClick={() => handleUp(product.cartId)}/>
                                </div>
                            </div>
                            <div className="product-cart-size">
                                <h4>Total</h4>
                                <p>{product.price * defaultQuantity}</p>
                            </div>
                            <div className="product-cart-delete">
                                <DeleteIcon onClick={() => handleDelete(product.cartId)}/>
                            </div>
                        </div>
                )
              })}  
                </div>
            <div className="checkout-container">
                <div className="total-bill">
                    <h3>Total Bill</h3>
                    <h2>{}</h2>
                </div>
                <div className="product-cart-action">
                    <button>Check Out</button>
                </div>
            </div>
        </div>
     );
}
 
export default Cart;
