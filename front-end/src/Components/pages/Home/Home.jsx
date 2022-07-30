
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ProductAPI } from '../../../API/API';
import UserContext from '../../../Contexts/UserContext';
import Banner from '../../commons/Banner/Banner';
import ListProduct from '../../ListProduct/ListProduct';
import Pagination from '../../Pagination/Pagination';

const Home = () => {

    const { isAdmin } = useContext(UserContext);
    const [listProduct, setListProduct] = useState([]);
    const [count, setCount] = useState(1);
    const [limit, setLimit] = useState(1);

    useEffect( () => {
        axios.get(
            `${ProductAPI.PRODUCT_API}?offset=0&limit=4`,{
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
            <Banner />
            {(isAdmin === 'admin') ? (<></>) : (
                <>
                    <ListProduct listProduct={listProduct} />
                    <Pagination limit={limit} count={count} setListProduct={setListProduct}/>
                </>
            )}
        </>
     );
}
 
export default Home;