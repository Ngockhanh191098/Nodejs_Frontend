import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './addcategory.css';

const AddCategory = () => {
    const navigate = useNavigate();

    const [nameCate, setNameCate] = useState('');
    const data = {
        name: nameCate
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(
            'http://127.0.0.1:5000/api/v1/category',data,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then(res => {
            alert(res.data.message);
        })
        .catch(err => {
            alert(err.response.data.message)
        })
        
        return navigate('/category-manager');
    }


    return ( 
        <div className="add-category-container">
            
            <form className="form-add-category" onSubmit={handleSubmit}>
                <h2 className="add-cate-title">ADD CATEGORY</h2>
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                            type="text" 
                            placeholder="name category..."
                            onChange={(e) => setNameCate(e.target.value)}
                        />
                    </div>
                    <button type="submit">ADD CATEGORY</button>
                </form>
        </div>
     );
}
 
export default AddCategory;