import axios from "axios";
import { useEffect, useState } from "react";
import ProductCart from "../ProdcutCart/ProductCart";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from "react-router-dom";

const ListProduct = () => {
    const [listProduct, setListProduct] = useState([]);

    useEffect(() => {
        axios.get(
            "http://127.0.0.1:5000/api/v1/product",{
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem('token')
                    }
            }
        )
        .then((res) => {
            setListProduct(res.data.allProduct);
        })
        .catch(err => console.log(err))
    }, [listProduct])

    return ( 
        <>
            <div className="add-product">
                <Link to="/add-product" style={{display:'flex',margin:"20px"}}>
                    <AddBoxIcon style={{fontSize:"35px",marginRight:"20px"}}/>
                    <p>ADD PRODUCT</p>
                </Link>
            </div>
            {listProduct.map((product) => {
                return (
                    <div key={product.id}>
                        <ProductCart 
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            size={product.size}
                            description={product.description}
                        />
                    </div>
                )
            })}
        </>
     );
}
 
export default ListProduct;