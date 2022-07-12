import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const LoginForm = ({ setIsForgot}) => {
    const redirectForgotPass = () => {
        setIsForgot(true);
    }
    const handleSubmit = () => {

    }


    return ( 
        <>
            <Form className="dangnhap py-5 col-4 mx-auto" onSubmit={handleSubmit}>
            <h2 className='text-center'>FORM LOGIN</h2>
            <Form.Group className="mb-1" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter username" 
                    />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    />
            </Form.Group>
            <div className='d-flex justify-content-between mb-4'>
                <div><span >You have an account?</span><Link to="/register">Register Now</Link></div>
                <Link to='/login' onClick={redirectForgotPass}>Forgot Password</Link>
            </div>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
        </>
     );
}
 
export default LoginForm;