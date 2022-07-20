
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css'
const NavbarCustomer = () => {
    const [listCategory, setListCategory] = useState([])
    const navigate = useNavigate();

        useEffect(() => {
        axios.get(
            "http://127.0.0.1:5000/api/v1/category"
        )
        .then(res => {
            setListCategory(res.data)
        })
        .catch(err => {
            console.log("loi roi");
        })
    },[]);

    const handleClick = (id,name) => {
        navigate(`/${name.toLowerCase()}`)
        axios.get(
            `http://127.0.0.1:5000/api/v1/product/${id}`
        )
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return ( 
        <>
            {listCategory.map((category) => {
                return (
                    <p onClick={() => handleClick(category.id, category.name)} key={category.id} className="list-category">{category.name}</p>
                )
            })}
        </>
     );
}
 
export default NavbarCustomer;