import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

const RegisterForm = () => {
    const initialValues = {fullname:"",username:"",email:"",password:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]:value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues)
        }
    },[formErrors])

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.fullname) {
            errors.fullname = "* Fullname is required!";
        }
        if (!values.username) {
            errors.username = "* Username is required!";
        }
        if (!values.email) {
            errors.email = "* Email is required!";
        }else if (!regex.test(values.email)) {
            errors.email = "* This is not a valid email format!"
        }
        if (!values.password) {
            errors.password = "* Password is required!";
        }else if (values.password.length < 4) {
            errors.password = "* Password must be more than 4 characters!"
        }
        return errors;
    }


    return ( 
        <div className='container-form'>
            <Form className="dky py-5 col-4 mx-auto" onSubmit={handleSubmit}>
            <h2 className='text-center'>FORM REGISTER</h2>
            <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control 
                    type="text" 
                    name="fullname" 
                    placeholder="Enter full name" 
                    value={formValues.fullname}
                    onChange={handleChange}
                    />
            </Form.Group>
            <p className='text-danger'>{formErrors.fullname}</p>
            <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text" 
                    name="username" 
                    placeholder="Enter username"
                    value={formValues.username}
                    onChange={handleChange}
                    />
            </Form.Group>
            <p className='text-danger'>{formErrors.username}</p>
            <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    name="email" 
                    placeholder="Enter email" 
                    value={formValues.email}
                    onChange={handleChange}
                    />
            </Form.Group>
            <p className='text-danger'>{formErrors.email}</p>
            <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formValues.password}
                    onChange={handleChange}
                    />
            </Form.Group>
            <p className='text-danger'>{formErrors.password}</p>
            <Button variant="primary" type="submit">
                REGISTER
            </Button>
        </Form>
        </div>
     );
}
 
export default RegisterForm;