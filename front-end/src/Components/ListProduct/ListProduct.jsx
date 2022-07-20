import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import ProductCart from "../ProductCart/ProductCart";
import './listproduct.css';

const ListProduct = () => {

    const [listProduct, setListProduct] = useState([]);
    const [count, setCount] = useState(1);
    const [limit, setLimit] = useState(1);
    const [offset, setOffset] = useState(1);

    useEffect( () => {
        axios.get(
            "http://127.0.0.1:5000/api/v1/product?offset=0&limit=4",{
             headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('accessToken')
            }
        })
        .then(res => {
            console.log(res);
            setListProduct(res.data.rows);
            setCount(res.data.count);
            setLimit(res.data.limit);
            setOffset(res.data.offset);
        })
        .catch(err => console.log(err));
    }, [])

    return ( 
        <>
            <section className="list-products">
                {listProduct.map((product) => {
                    return (
                        <div key={product.id}>
                            <ProductCart
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                size={product.size}
                                image={product.image}
                            />
                        </div>
                    )
                })}
            </section>
            <Pagination count={count} limit={limit} setListProduct={setListProduct} />
        </>
     );
}
 
export default ListProduct;