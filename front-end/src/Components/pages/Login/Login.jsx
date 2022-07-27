import { useContext, useState } from "react";
import Button from "../../commons/buttons/Button";
import './login.css';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../../Contexts/UserContext";
import { toast } from "react-toastify";

const Login = () => {

    const navigate = useNavigate();

    const [isForgot, setIsForgot] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { setUser } = useContext(UserContext);
    const dataLogin = {
        username: username,
        password: password
    };

    const handleSubbmit = (e) => {
        e.preventDefault();
        axios.post(
            "http://127.0.0.1:5000/api/v1/auth/signin",
            dataLogin
        )
        .then(res => {
            toast.success(res.data.message)
            const token = res.data.accessToken;
            const role = res.data.role;
            const username = res.data.username;
            const avatar = res.data.avatar;
            const idUser = res.data.id;
            localStorage.setItem("token",token)
            localStorage.setItem('avatar', avatar)
            localStorage.setItem('role',role)
            localStorage.setItem("username", username)
            localStorage.setItem("idUser", idUser)
            setUser(res.data);
            toast.success("Login successfully!")
            return navigate('/')
        })
        .catch(err => {
            toast.error(err.response.data.message)
        });
    };

    const handleForgot = () => {
        setIsForgot(true)
    }
    const handleCancel = () => {
        setIsForgot(false)
    }
    const data = {
        email: email
    }
    const handleSendEmail = () => {
        axios.post(
            'http://127.0.0.1:5000/api/v1/account/forgotpass',
            data
        )
        .then(res => {
            toast.success(res.data.message);
        })
        .catch(err => {
            toast.error(err.response.data.message);
        })
    }
    
    return ( 
        <div className="container">
                {(!isForgot) ? (
                <>
                    <form className="form-container" onSubmit={handleSubbmit}>
                    <h2>FORM LOGIN</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" required/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-around",marginBottom:"20px"}}>
                        <Link to="/register">Register Now</Link>
                        <Link to="/login" onClick={handleForgot}>Forgot Password</Link>
                    </div>
                    <Button type="submit" title="Login"/>
                </form>
                </>) : (
                <>
                    <div className="forgot-pass-container">
                        <p>Please feild your email to change password!</p>
                        <input 
                            type="email" 
                            placeholder="Your email"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        <button type="button" onClick={handleSendEmail}>OK</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </>)}
        </div>
     );
}
 
export default Login;