import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './productCart.css';
import axios from 'axios';

const ProductCart = (props) => {
    const { id, title, price, image, size } = props;

    const deleteDog = () => {
        axios.delete(
            `http://127.0.0.1:5000/api/v1/product/${id}`,{
                    headers: {
                    "x-access-token": localStorage.getItem('token')
                }
            }
        )
        .then((res) => {
            alert(res.data.message);
        })
        .catch(err => console.log(err))
    }
    return ( 
        <>
            <div className="product-cart-container">
                <div className="product-image">
                    <img src={`http://127.0.0.1:5000/public/images/${image}`} alt={image} />
                </div>
                <div className="product-title">
                    <strong>Title : </strong><span>{title}</span>
                </div>
                <div className="product-price">
                    <strong>Price : </strong><span>{price}</span>
                </div>
                <div className="product-size">
                    <strong>Size : </strong><span>{size}</span>
                </div>
                <div className='handle-btn'>
                    <EditIcon className='edit-btn' />
                    <DeleteIcon className='delete-btn' onClick={deleteDog}/>
                </div>
            </div>
        </>
     );
}
 
export default ProductCart;