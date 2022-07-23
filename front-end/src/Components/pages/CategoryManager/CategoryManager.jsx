import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './categorymanager.css';
import { useNavigate } from "react-router-dom";

const CategoryManager = () => {
    const navigate = useNavigate();

    const [listCategory, setListCategory] = useState([]);
    const [idCate, setIdCate] = useState(0);
    const [isUpdate, setIsUpdate] = useState(false);
    const [nameCategory, setNameCategory] = useState('')

    useEffect(() => {
        axios.get(
            `http://127.0.0.1:5000/api/v1/category`
        )
        .then(res => {
            setListCategory(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    },[]);

    const handleDelete = (id) => {
        axios.delete(
            `http://127.0.0.1:5000/api/v1/category/${id}`,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then(res => {
            alert(res.data.message);
        })
        .catch(err => alert(err.response.data.message))
    }

    const handleUpdate = (id) => {
        setIsUpdate(true);
        setIdCate(id)
    }
    const data = {
        name: nameCategory
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(
            `http://127.0.0.1:5000/api/v1/category/${idCate}`,data,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then(res => {
            alert(res.data.message);
        })
        .catch(err => {
            alert(err.response.data.message);
        })
        setIsUpdate(false)
    }

    const handleCancel = () => {
        setIsUpdate(false)
    }

    const handleAddCategory = () => {
        return navigate('/add-category');
    }

    return ( 
        <>
            {(isUpdate) ? (
            <div className="update-category-container">
                <form className="form-update-category" onSubmit={handleSubmit}>
                    <h3>UPDATE CATEGORY</h3>
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                            type="text" 
                            placeholder="name category..."
                            onChange={(e) => setNameCategory(e.target.value)}
                        />
                    </div>
                    <button type="submit">UPDATE</button>
                    <button onClick={handleCancel}>CANCEL</button>
                </form>
            </div>
        ) : (
            <div className="cate-manager-container">
            <h2>CATEGORY MANAGER</h2>
            <div>
            {listCategory.map((category) => {
                return (
                    <div key={category.id} className="cate-item">
                        <div className="cate-title">
                            <strong>Name: </strong>
                            <h3>{category.name}</h3>
                        </div>
                        <div className="cate-acction">
                            <EditIcon className="edit-cate" onClick={() => handleUpdate(category.id)}/>
                            <DeleteIcon className="delete-cate" onClick={() => handleDelete(category.id)}/>
                        </div>
                    </div>
                )
            })}
            </div>
            <button className="btn-add-category" onClick={handleAddCategory}>ADD CATEGORY</button>
        </div>
        )}
        </>
        
     );
}
 
export default CategoryManager;