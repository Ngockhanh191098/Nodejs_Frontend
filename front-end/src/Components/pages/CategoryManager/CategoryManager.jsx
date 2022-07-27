import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './categorymanager.css';
import { toast } from "react-toastify";

const CategoryManager = () => {

    const [listCategory, setListCategory] = useState([]);
    const [idCate, setIdCate] = useState(0);
    const [isUpdate, setIsUpdate] = useState(false);
    const [nameCategory, setNameCategory] = useState('');
    const [isAction, setIsAction] = useState(false);
    const [isAddCate, setIsAddCate] = useState(false)
    const [nameCate, setNameCate] = useState('');
    const dataAdd = {
        name: nameCate
    }
    const handleAddCate = (e) => {
        e.preventDefault();
        axios.post(
            'http://127.0.0.1:5000/api/v1/category',dataAdd,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then(res => {
            toast.success(res.data.message);
            setIsAction(!isAction)
            setIsAddCate(false);
        })
        .catch(err => {
            toast.error(err.response.data.message)
        })
        
    }

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
    },[isAction]);

    const handleDelete = (id) => {
        axios.delete(
            `http://127.0.0.1:5000/api/v1/category/${id}`,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then(res => {
            toast.success(res.data.message);
            setIsAction(!isAction)
        })
        .catch(err => toast.error(err.response.data.message))
    }

    const handleUpdate = (id) => {
        setIsUpdate(true);
        setIdCate(id)
    }
    const dataUpdate = {
        name: nameCategory
    }

    const handleUpdateCate = (e) => {
        e.preventDefault();
        axios.put(
            `http://127.0.0.1:5000/api/v1/category/${idCate}`,dataUpdate,{
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
        })
        .then(res => {
            toast.success(res.data.message);
            setIsAction(!isAction)
        })
        .catch(err => {
            toast.error(err.response.data.message);
        })
        setIsUpdate(false)
    }

    const handleCancelUpdate = () => {
        setIsUpdate(false)
    }
    const handleCancelAdd = () => {
        setIsAddCate(false);
    }

    const handleAddCategory = () => {
        setIsAddCate(true);
    }

    return ( 
        <>
            {(isUpdate || isAddCate) ? (
            <>
                {isAddCate ? (
                    <>
                        <div className="add-category-container">
                            <form className="form-add-category" onSubmit={handleAddCate}>
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
                                <button onClick={handleCancelAdd}>CANCEL</button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="update-category-container">
                        <form className="form-update-category" onSubmit={handleUpdateCate}>
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
                            <button onClick={handleCancelUpdate}>CANCEL</button>
                        </form>
                    </div>
                )}
                
            </>
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