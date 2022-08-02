
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ProductAPI } from '../../../API/API';
import UserContext from '../../../Contexts/UserContext';
import Banner from '../../commons/Banner/Banner';
import ListProduct from '../../ListProduct/ListProduct';
import Pagination from '../../Pagination/Pagination';
import Slider from '../../../Slider/Slider';

const Home = ({setIsAddCart, isAddCart}) => {

    const { isAdmin } = useContext(UserContext);
    const [listProduct, setListProduct] = useState([]);
    const [count, setCount] = useState(1);
    const [limit, setLimit] = useState(1);

    useEffect( () => {
        axios.get(
            `${ProductAPI.PRODUCT_API}?offset=0&limit=8`,{
        })
        .then(res => {
            setListProduct(res.data.rows);
            setCount(res.data.count);
            setLimit(res.data.limit);
        })
        .catch(err => console.log(err));
    }, [])

    return ( 
        <>
            <Slider />
            {(isAdmin === 'admin') ? (<></>) : (
                <>
                    <ListProduct listProduct={listProduct} setIsAddCart={setIsAddCart} isAddCart={isAddCart}/>
                    <Pagination limit={limit} count={count} setListProduct={setListProduct}/>
                </>
            )}
        </>
     );
}
 
export default Home;