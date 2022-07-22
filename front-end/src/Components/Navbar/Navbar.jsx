
import { useNavigate } from 'react-router-dom';
import './navbar.css'
const NavbarCustomer = (props) => {
    const { listCategory, setIdCategory } = props;

    const navigate = useNavigate();

    const handleClick = (id,name) => {
        setIdCategory(id);
        const nameCate = name.toLowerCase()
        navigate(`/category/product`)
    }

    return ( 
        <ul className='list-category-customer'>
            {listCategory.map((category, index) => {
                
                return (
                    <li onClick={() => handleClick(category.id, category.name)} key={index} className="list-category">{category.name}</li>
                )
            })}
        </ul>
     );
}
 
export default NavbarCustomer;