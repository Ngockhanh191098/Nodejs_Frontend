import { useState } from "react";
import Button from "../../commons/buttons/Button";
import axios from 'axios';
import './register.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
    const navigate = useNavigate();
    const initialValues = { username: "", email: "", password: "", confirmPassword: "" };

    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit){
            const newData = {
                        username: formValues.username,
                        email: formValues.email,
                        password: formValues.password
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
        }
    }, [formErrors])
    
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = "* Username is required!"
        }
        if (!values.email) {
            errors.email = "* Email is required!"
        } else if (!regex.test(values.email)) {
            errors.email = "* This is not a valid email format!"
        }
        if (!values.password) {
            errors.password = "* Password is required!"
        }else if (values.password.length <= 4) {
            errors.password = "* Password must be more than 4 characters!"
        }else if (values.password.length > 30) {
            errors.password = "* Password must be less than 30 characters!"
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "* Confirm Password is required!"
        }else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "* Confirm password is not format with password!"
        }
        return errors;
    }

    return ( 
        <div className="container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <h2>FORM REGISTER</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text"
                            name="username"  
                            placeholder="Enter your username"
                            value={formValues.username}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="error-form">{ formErrors.username }</p>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            name="email"  
                            placeholder="Enter your email"
                            value={formValues.email}
                            onChange={handleChange} 
                        />
                    </div>
                    <p className="error-form">{ formErrors.email }</p>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password"
                            name="password"   
                            placeholder="Enter your Password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="error-form">{ formErrors.password }</p>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword"  
                            placeholder="Confirm your Password"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <p className="error-form">{ formErrors.confirmPassword }</p>
                    <Button type="submit" title="Register"/>
                </form>
        </div>
     );
}
 
export default Register;