import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  // STATE AND UPDATER FUNCTIONS
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');



  // handle submit function
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
      password: password,
    };
    
    try{
      const response = await fetch('http://localhost:3001/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if(response.ok){
        setSuccess("Signup successful!");
        setError(null);
        console.log(success);
      }
      else{
        setError(data.message || "An error occured");
        setSuccess(null);
      }
    }
    catch(error){
      setError("There was a problem.");
      setSuccess(null);
    }
  };

  useEffect(() => {
    console.log("Error state: ", error);

  }, [error]);

  return(
    <div>
      <h1 className="text-3xl font-bold underline">Signup:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
          type="email"
          id="email"
          placeholder="Enter email."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <label htmlFor="password">Password:</label>
        <input 
          type="password"
          id="password"
          placeholder="Create password."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      <p>Already have an acoount? Click <Link to="/login">here</Link> to login.</p>
    </div> 
  );
};

export default Signup;






























