import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import './managerAccount.css';
import CloseIcon from '@mui/icons-material/Close';

const ManagerAccount = () => {
    const [account, setAccount] = useState({})
    const initialValues = {currentPassword: "", newPassword: "", confirmPassword: "" };
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const username = localStorage.getItem('username');
    useEffect(() => {
        axios.get(
            `http://127.0.0.1:5000/api/v1/user/${username}`,{
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem('token')
                }
            }
        )
        .then(res => {
            setAccount(res.data);
        })
        .catch(err => {
            console.log(err);
        });

        if (Object.keys(formErrors).length === 0 && isSubmit){
            const newPassword = {
                        password: formValues.password
                    }
                    axios.put(
                        `http://127.0.0.1:5000/api/v1/user?username=${username}`,
                        newPassword,{
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": localStorage.getItem('token')
                            }
                        }
                    )
                    .then(res => {
                        alert('Change password success!');
                    })
                    .catch(err => console.log(err))
        }
    },[formErrors]);

    const closeForm = () => {
        document.querySelector(".form-change-pass").style.display = "none"
    }

    const handleChangePass = () => {
        document.querySelector(".form-change-pass").style.display = "block"
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    const validate = (values) => {
        const errors = {};
        if (!values.currentPassword) {
            errors.currentPassword = "* Password is required!"
        }
        if (!values.newPassword) {
            errors.newPassword = "* Password is required!"
        }else if (values.newPassword.length <= 4) {
            errors.newPassword = "* Password must be more than 4 characters!"
        }else if (values.newPassword.length > 30) {
            errors.newPassword = "* Password must be less than 30 characters!"
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "* Confirm Password is required!"
        }else if (values.confirmPassword !== values.newPassword) {
            errors.confirmPassword = "* Confirm password is not format with password!"
        }
        return errors;
    }

    return ( 
        <>
            <div className="account-manager-container">
                <div className="account-avatar">
                    <img src={`http://127.0.0.1:5000/public/images/${account.avatar}`} alt={account.avatar} />
                    <button className="change-avt">Change Avatar</button>
                </div>
                <div className="account-info-action">
                    <div className="account-info"><strong>Username: </strong><span>{account.username}</span></div>
                    <div className="account-info"><strong>Email: </strong><span>{account.email}</span></div>
                    <button className="account-action" onClick={handleChangePass}>Change Password</button>
                    <button className="account-action">My Order</button>
                </div>
                <div className="form-change-pass">
                    <CloseIcon  className="close-icon" onClick={closeForm}/>
                    <h3>CHANGE PASSWORD</h3>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                            <label>Current Password</label>
                            <input 
                                type="password" 
                                name="currentPassword"
                                placeholder="New password..."
                                value={formValues.currentPassword}
                                onChange={handleChange}    
                            />
                        </div>
                        <p className="error-form">{ formErrors.currentPassword }</p>
                        <div className="form-group">
                            <label>New Password</label>
                            <input 
                                type="password" 
                                name="newPassword"
                                placeholder="New password..."
                                value={formValues.newPassword}
                                onChange={handleChange}    
                            />
                        </div>
                        <p className="error-form">{ formErrors.newPassword }</p>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input 
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password..."
                                value={formValues.confirmPassword}
                                onChange={handleChange}     
                            />
                        </div>
                        <p className="error-form">{ formErrors.confirmPassword }</p>
                        <button type="submit" className="change-pass-btn">Change Password</button>
                    </form>
                </div>
            </div>
        </>
     );
}
 
export default ManagerAccount;