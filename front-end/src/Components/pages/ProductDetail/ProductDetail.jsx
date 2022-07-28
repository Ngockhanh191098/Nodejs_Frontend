
import { useState } from "react";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DoDisturbOnRoundedIcon from '@mui/icons-material/DoDisturbOnRounded';
import './productDetail.css';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const ProductDetail = () => {
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const idUser = localStorage.getItem('idUser');
    const username = localStorage.getItem('username');
    const [productDetail, setProductDetail] = useState({});
    const navigate = useNavigate();
    const [image, setImage] = useState('');

    useEffect(() => {
        axios.get(
            `http://127.0.0.1:5000/api/v1/product/detail/${params.id}`
        )
        .then(res => {
            setProductDetail(res.data);
            setImage(res.data.image)
        })
        .catch(err => {
            console.log(err);
        })

    },[])
    
    if(quantity === 0) {
        setQuantity(1);
    }
    const handleDown = () => {
        setQuantity(quantity - 1);
    }

    const handleUp = () => {
        setQuantity(quantity + 1);
    };

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

    return ( 
        <>
        <h2 className="product-detail-title">PRODUCT DETAIL</h2>
        <div className="product-detail-container">
            <div className="product-detail-image">
                <img src={(image === '') ? (``) : (`http://127.0.0.1:5000/public/images/${image}`)} alt="product-detail" />
            </div>
            <div className="product-detail-info">
                <div className="product-title">
                    <h3>{productDetail.title}</h3>
                </div>
                <div className="product-price">
                    <p>Price: </p>
                    <h3>{productDetail.price} VND</h3>
                </div>
                <div className="product-size">
                    <p>Size: </p>
                    <h3>{productDetail.size}</h3>
                </div>
                <div className="product-description">
                    <p>Description: </p>
                    <h3>{productDetail.description}</h3>
                </div>
                <div className="product-quantity">
                    <div className="choose-quantity">
                        <DoDisturbOnRoundedIcon  className="product-up-down-btn" onClick={handleDown}/>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} disabled/>
                        <ControlPointIcon className="product-up-down-btn" onClick={handleUp}/>
                    </div>
                </div>
                <div className="product-action">
                    <button className="checkout-btn">Buy Now</button>
                    <button className="add-to-cart-btn" onClick={() => handleAddCart(productDetail.id)}>Add To Cart</button>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default ProductDetail;