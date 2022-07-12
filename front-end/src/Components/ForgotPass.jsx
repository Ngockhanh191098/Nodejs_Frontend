import '../style/forgotpass.css';
const ForgotPass = () => {
    return ( 
        <div className="forgot-pass-container">
            <div className='forgot-pass'>
                <h4 className='forgot-title'>FORGOT PASSWORD</h4>
                <p>Please enter your email</p>
                <input type="text" placeholder="Enter your email"/>
                <button>OK</button>
            </div>
        </div>
     );
}
 
export default ForgotPass;