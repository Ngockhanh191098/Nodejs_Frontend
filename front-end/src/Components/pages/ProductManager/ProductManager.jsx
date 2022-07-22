import SearchIcon from '@mui/icons-material/Search';
import './productManager.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import ListProductManager from '../../ListProductManager/ListProductManager';
const Product = () => {

    const [categories, setCategories] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [count, setCount] = useState(1);
    const [limit, setLimit] = useState(1);

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
        getCategory().catch(err => console.log(err));

        Axios.get(
            "http://127.0.0.1:5000/api/v1/product?offset=0&limit=8",{
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
    }, [])
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
                <ListProductManager categories={categories} listProduct={listProduct} count={count} limit={limit} setListProduct={setListProduct}/>
            </div>
        </div>
     )
}
 
export default Product;