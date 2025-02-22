import React from 'react';

const Signup = () => {
  return(
    <div>
      <h1>Signup:</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input 
          type="email"
          id="email"
          placeholder="Enter email."
        />
        
        <label htmlFor="password">Password:</label>
        <input 
          type="password"
          id="password"
          placeholder="Create password."
        />
        
        <button type="submit">Register</button>
      </form>
    </div> 
  );
};

export default Signup;






























