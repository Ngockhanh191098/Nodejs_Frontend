import { useContext, useState } from "react";
import Button from "../../commons/buttons/Button";
import Input from "../../commons/inputs/Input";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import UserContext from "../../../Contexts/UserContext";



const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setRole } = useContext(UserContext);

    const handleSubbmit = (e) => {
        e.preventDefault();
        const dataLogin = {
            username: username,
            password: password
        };
        axios.post(
            "http://127.0.0.1:5000/api/v1/auth/signin",
            dataLogin
        )
        .then(res => {
            const token = res.data.accessToken;
            const role = res.data.role;
            const username = res.data.username;
            const avatar = res.data.avatar;
            localStorage.setItem("token",token)
            localStorage.setItem('avatar', avatar)
            localStorage.setItem('role',role)
            localStorage.setItem("username", username)
            setRole(role);
            alert("Login Successfully!")
            return navigate('/')
        })
        .catch(err => alert("Your username or password is incorrect! Please login again!"));
    }
    

    return ( 
        <div className="container">
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
                        <a href="/register">Register Now</a>
                        <a href="/forgot-password">Forgot Password</a>
                    </div>
                    <Button type="submit" title="Login"/>
                </form>
        </div>
     );
}
 
export default Login;