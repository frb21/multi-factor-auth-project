import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password){
      setError('Both fields are required');
      return;
    }

    if(!/\S+@\S+\.\S+/.test(email)){
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    console.log('Form submitted:', {email, password});

    const userData = {
      email: email,
      password: password
    };

    try{
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      if(response.ok){
        setSuccess("Login successful");
        setError(null);
        console.log(success);
        alert("OTP Sent!");
        navigate('/verify-login', {state: {email}});
      }
      else{
        setError(data.message || 'Error has occurred');
        setSuccess(null);
        console.log(error);
      }
    }
    catch(error){
      setError(error);
      console.log("There was a problem.");
      setSuccess(null);
    }
  };

  useEffect(() => {
    console.log("Error state: ", error);
  }, [error]);

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Email:</label>
        <input 
          id="email"
          type="email"
          placeholder="Enter email."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input 
          id="password"
          type="password"
          placeholder="Enter password."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;




























