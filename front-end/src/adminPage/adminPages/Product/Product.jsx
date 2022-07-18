import SearchIcon from '@mui/icons-material/Search';
import './product.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import ListProduct from '../../components/ListProduct/ListProduct';
const Product = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getCategory() {
            const res = await Axios.get(
                "http://127.0.0.1:5000/api/v1/category",{
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem('token')
                        }
                }
            );
            return res;
        }
        getCategory().then(res => {
            setCategories(res.data)
        })
        getCategory().catch(err => console.log(err))


    }, [categories])
    return ( 
        <div className="product-container">
            <div className="product-sidebar">
                <div className="search-product">
                    <input type='text' placeholder="Search product..." />
                    <SearchIcon className='search-icon'/>
                </div>
                <div className='product-by-category'>
                    <h3 className='cate-product'>CATEGORY</h3>
                    <ul className='list-category'>
                        {categories.map((category) => {
                            return (
                                <div key={category.id} className="category-item">
                                    <li>{category.name}</li>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className='list-product'>
                <ListProduct />
            </div>
        </div>
     )
}
 
export default Product;