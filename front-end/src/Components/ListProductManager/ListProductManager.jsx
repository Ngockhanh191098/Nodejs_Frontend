
import { useState } from "react";
import ProductCart from "../ProdcutCartManager/ProductCartManager";
import AddBoxIcon from '@mui/icons-material/AddBox';
import './listProductManager.css';
import CloseIcon from '@mui/icons-material/Close';
import FormAddProduct from "../FormAddProduct/FormAddProduct";
import Pagination from "../Pagination/Pagination";

const ListProduct = (props) => {
    const {categories, listProduct, count, limit, setListProduct } = props;
    const [appenForm, setAppenForm] = useState(false);

    const addProduct = () => {
        setAppenForm(true)
    }

    const handleCLoseForm = () => {
        setAppenForm(false);
    }

    return ( 
        <div className="list-product-container"> 
            {appenForm ? (
                <>
                        <CloseIcon className="close-form" onClick={handleCLoseForm}/>
                        <FormAddProduct  categories={categories} setAppenForm={setAppenForm}/>
                </>
            ) : (
                <>
                    <div className="add-product">
                        <AddBoxIcon className="add-icon" onClick={addProduct}/>
                        <p className="add-title">ADD PRODUCT</p>
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
                 <Pagination count={count} limit={limit} setListProduct={setListProduct}/>
                </>
            )}
            
        </div>
     );
}
 
export default ListProduct;