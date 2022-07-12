import LoginForm from "../Components/LoginForm";
import { useState } from 'react';
import RegisterForm from "../Components/RegisterForm";
import ForgotPass from "../Components/ForgotPass";

const Login = () => {
    const [isForgot, setIsForgot] = useState(false);

    return ( 
        <>
            {!isForgot ? (<LoginForm setIsForgot={setIsForgot} />) : (<ForgotPass />)}
        </>
     );
}
 
export default Login;