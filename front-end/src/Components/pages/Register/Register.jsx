import { useState } from "react";
import Button from "../../commons/buttons/Button";
import Input from "../../commons/inputs/Input";
import axios from 'axios';
import './register.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            username: username,
            email: email,
            password: password
        }
        axios.post(
            "http://127.0.0.1:5000/api/v1/auth/signup",
            newData
        )
        .then(res => {
            console.log(res);
            alert('Register success!');
            return navigate('/login')
        })
        .catch(err => console.log(err))
    };

    return ( 
        <div className="container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <h2>FORM REGISTER</h2>
                    <div className="form-group">
                        <label>Usernam</label>
                        <Input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username"/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <Input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <Input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password"/>
                    </div>
                    <Button type="submit" title="Register"/>
                </form>
        </div>
     );
}
 
export default Register;