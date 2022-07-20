import axios from "axios";
import { useEffect, useState } from "react";
import ProductCart from "../ProdcutCartManager/ProductCartManager";
import AddBoxIcon from '@mui/icons-material/AddBox';
import './listProductManager.css';
import Pagination from "../Pagination/Pagination";
import {v4} from 'uuid';

const ListProduct = (props) => {
    const {categories} = props; 
    const [listProduct, setListProduct] = useState([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('M');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(1);
    const [count, setCount] = useState(1);
    const [limit, setLimit] = useState(1);

    useEffect(() => {
        axios.get(
            "http://127.0.0.1:5000/api/v1/product?offset=0&limit=5",{
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem('token')
                    }
            }
        )
        .then((res) => {
            setListProduct(res.data.rows);
            setCount(res.data.count);
            setLimit(res.data.limit);
        })
        .catch(err => console.log(err))
    },[])
    

    const addProduct = () => {
        document.querySelector('.form-add-product-container').style.display = 'block'
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        document.querySelector('.form-add-product-container').style.display = 'none';
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('size', size);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('categoryId', category);

        axios.post('http://127.0.0.1:5000/api/v1/product',formData,{
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": localStorage.getItem('token')
            }
        })
        .then(res => {
            alert('Add product success!');
        })
        .catch(err => console.log(err))
    }

    return ( 
        <div className="list-product-container">
            <div className="add-product">
                    <AddBoxIcon className="add-icon" onClick={addProduct}/>
                    <p className="add-title">ADD PRODUCT</p>
            </div>
            <div className="form-add-product-container">
            <form onSubmit={handleSubmit} className="form-add-product">
                <div className="form-group">
                    <label className="label">Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label className="label">Price</label>
                    <input type="text" onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div className="form-group">
                <label className="label">Size</label>
                <select name="breed" onChange={(e) => setSize(e.target.value)}>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </div>
                <div className="form-group">
                    <label className="label">Image</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                </div>
                <div className="form-group">
                    <label className="label">Description</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label className="label">Category</label>
                    <select name="category" onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((category) => {
                            return (
                                <option key={v4()} value={category.id}>{category.name}</option>
                            )
                        })}
                    </select>
                </div>
                <button type="submit" className="add-btn">Add Product</button>
            </form>
            </div>
            {listProduct.map((product) => {
                return (
                    <div key={product.id}>
                        <ProductCart 
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            size={product.size}
                            description={product.description}
                        />
                    </div>
                )
            })}
            <Pagination count={count} limit={limit} setListProduct={setListProduct}/>
        </div>
     );
}
 
export default ListProduct;