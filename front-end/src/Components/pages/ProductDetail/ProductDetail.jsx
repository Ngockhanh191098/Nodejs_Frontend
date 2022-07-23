import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import './productDetail.css';

const ProductDetail = (props) => {

    const [product, setProduct] = useState({});
    const { idProduct } = props;

    useEffect(() => {
        axios.get(
            `http://127.0.0.1:5000/api/v1/product/detail/${idProduct}`
        )
        .then(res => {
            setProduct(res.data);
        })
        .catch(err => {
            alert(err.response.data.message);
        })
    }, [])

    return ( 
        <>
        <h2 className="product-detail-title">PRODUCT DETAIL</h2>
        <div className="product-detail-container">
            <div className="product-detail-image">
                <img src={`http://127.0.0.1:5000/public/images/${product.image}`} alt={product.title} />
            </div>
            <div className="product-detail-info">
                <div className="product-title">
                    <h3>{product.title}</h3>
                </div>
                <div className="product-price">
                    <p>Price: </p>
                    <h3>{product.price} VND</h3>
                </div>
                <div className="product-size">
                    <p>Size: </p>
                    <h3>{product.size}</h3>
                </div>
                <div className="product-description">
                    <p>Description: </p>
                    <h3>{product.description}</h3>
                </div>
                <div className="product-quantity">
                    <div className="choose-quantity">
                        <ControlPointIcon  className="product-up-down"/>
                        <input type="number" value='1'/>
                        <ControlPointIcon className="product-up-down"/>
                    </div>
                </div>
                <div className="product-action">
                    <button className="checkout-btn">Buy Now</button>
                    <button className="add-to-cart-btn">Add To Cart</button>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default ProductDetail;