import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    return ( 
        <>
            <Form className="dangnhap py-5 col-4 mx-auto">
            <h2 className='text-center'>FORM LOGIN</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div className='d-flex justify-content-between mb-4'>
                <div><span >You have an account?</span><Link to="/register">Register Now</Link></div>
                <Link to='/forgot-password'>Forgot Password</Link>
            </div>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </>
     );
}
 
export default LoginForm;