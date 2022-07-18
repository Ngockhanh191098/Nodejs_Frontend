import { Link } from 'react-router-dom';
import Banner from '../../../images/banner2.jpg';

const AdminHome = () => {
    return ( 
        <>
            <Link to="/"><img src={Banner} alt={Banner} style={{width:"100%",display:"block"}}/></Link>
        </>
     );
}
 
export default AdminHome;