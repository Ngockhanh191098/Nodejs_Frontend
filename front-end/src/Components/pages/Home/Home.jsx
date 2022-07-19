
import Banner from '../../../images/banner2.jpg';
import ListProduct from '../../ListProduct/ListProduct';

const Home = () => {
    return ( 
        <>
            <a href="/"><img src={Banner} alt={Banner} style={{width:"100%",display:"block"}}/></a>
            <ListProduct />
        </>
     );
}
 
export default Home;