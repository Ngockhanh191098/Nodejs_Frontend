import '../style/forgotpass.css';
const ForgotPass = () => {
    return ( 
        <div className="forgot-pass-container">
            <h3>FORGOT PASSWORD</h3>
            <p>Please enter your email</p>
            <input type="text" placeholder="Enter your email"/>
            <button>OK</button>
        </div>
     );
}
 
export default ForgotPass;