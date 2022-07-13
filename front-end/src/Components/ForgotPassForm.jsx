import '../style/forgotpass.css';
import { useNavigate } from "react-router-dom";
const ForgotPassForm = () => {

    const navigate = useNavigate();
    const redirectLogin = () => {
        navigate('/login');
    }

    return ( 
        <div className="forgot-pass-container">
            <div className='forgot-pass'>
                <h4 className='forgot-title'>FORGOT PASSWORD</h4>
                <p>Please enter your email</p>
                <input type="email" placeholder="Enter your email"/>
                <button onClick={redirectLogin}>Cancel</button>
                <button>OK</button>
            </div>
        </div>
     );
}
 
export default ForgotPassForm;