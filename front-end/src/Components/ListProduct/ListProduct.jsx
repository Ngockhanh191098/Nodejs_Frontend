
import ProductCart from "../ProductCart/ProductCart";
import './listproduct.css';

const ListProduct = (props) => {

    const {listProduct} = props;

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
        </>
     );
}
 
export default ListProduct;