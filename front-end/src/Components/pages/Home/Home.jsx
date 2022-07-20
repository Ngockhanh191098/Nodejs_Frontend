
import { useContext } from 'react';
import UserContext from '../../../Contexts/UserContext';
import Banner from '../../../images/banner2.jpg';
import ListProduct from '../../ListProduct/ListProduct';

const Home = () => {
    const { isAdmin } = useContext(UserContext);
    return ( 
        <>
            <a href="/"><img src={Banner} alt={Banner} style={{width:"100%",display:"block"}}/></a>
            {(isAdmin === 'admin') ? (<></>) : (<ListProduct />)}
        </>
     );
}
 
export default Home;