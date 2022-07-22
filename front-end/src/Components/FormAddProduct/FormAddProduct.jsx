import axios from "axios";
import { useState } from "react";
import {v4} from 'uuid';



const FormAddProduct = (props) => {

    const { categories,setAppenForm } = props;

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('S');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
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
            setAppenForm(false);
        })
        .catch(err => console.log(err))
    }

    return ( 
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
     );
}
 
export default FormAddProduct;