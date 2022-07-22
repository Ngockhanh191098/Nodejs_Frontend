import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Banner from "../../commons/Banner/Banner";
import ListProduct from "../../ListProduct/ListProduct";

const TShirt = (props) => {
    const { idCategory } = props;
    const [listProduct, setListProduct] = useState([]);

    useEffect(() => {
        axios.get(
            `http://127.0.0.1:5000/api/v1/product/category/${idCategory}`
        )
        .then(res => {
            setListProduct(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    },[])
    return ( 
        <>
            <Banner />
            <ListProduct listProduct={listProduct} />
        </>
     );
}
 
export default TShirt;