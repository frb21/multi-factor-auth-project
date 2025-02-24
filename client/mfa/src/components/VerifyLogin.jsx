import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyLogin = () => {
  const [otp, setOtp] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!otp){
      setError("Enter Valid OTP!");
      setSuccess(null);
      return;
    }
    else{
      setSuccess("Account verified successfully.");
      setError(null);
      console.log(success);
    }

    setError('');
    console.log('OTP Submitted:', {email, otp});

    const userData = {
      email: email,
      otp: otp
    };
    
    try{
      const response = await fetch('http://localhost:3001/auth/verify-login', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json',},
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      if(response.ok){
        //setSuccess("Login successful");
        setError(null);
        console.log("Login successful");
      }
      else{
        setError(data.message || 'Error has occurred');
        setSuccess(null);
        console.log(error);
      }
    } 
    catch(error){
      setError(error);
      console.log("There was a problem in verifiying OTP.");
      setSuccess(null);
    }
};

useEffect(() => {
  console.log("Error state:", error);
}, [error]);


  return(
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Verify Login</h1>
        <label htmlFor="otp">Enter OTP:</label>
          <input 
            id="otp"
            type="password"
            placeholder="Enter OTP Code"
            value={otp}
            onChange = {(e) => setOtp(e.target.value)}
          />
          <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}

export default VerifyLogin;


































