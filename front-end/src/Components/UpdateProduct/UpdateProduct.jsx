// import { useState } from "react";

import axios from "axios";
import { useState } from "react";

const UpdateProduct = (props) => {
    const { categories, setAppendFormUpdate, idProduct } = props;

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

        axios.put(`http://127.0.0.1:5000/api/v1/product/${idProduct}`,formData,{
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": localStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res.data);
            setAppendFormUpdate(false);
        })
        .catch(err => console.log(err))
    }


    return ( 
        <form onSubmit={handleSubmit} className="form-add-product">
                <h3>UPDATE PRODUCT</h3>
                    <div className="form-group">
                        <label className="label">Title</label>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label className="label">Price</label>
                        <input type="text" onChange={(e) => setPrice(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                    <label className="label">Size</label>
                    <select name="breed" onChange={(e) => setSize(e.target.value)} required>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                    <div className="form-group">
                        <label className="label">Image</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} required/>
                    </div>
                    <div className="form-group">
                        <label className="label">Description</label>
                        <input type="text" onChange={(e) => setDescription(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label className="label">Category</label>
                        <select name="category" onChange={(e) => setCategory(e.target.value)} required>
                            {categories.map((category, index) => {
                                return (
                                    <option key={index} value={category.id}>{category.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button type="submit" className="add-btn">Update Product</button>
                </form>
     );
}
 
export default UpdateProduct;