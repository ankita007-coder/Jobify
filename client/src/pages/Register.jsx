import React from 'react'
import {Link} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterPage';
import { FormRow,Logo } from '../components';
const Register = () => {
  return (
    <Wrapper>
     
      <form className='form' method="post">
        <Logo/>
        <h4>Register</h4>
        <FormRow 
            type='text' 
            name='name' 
            labelText='First name'
            defaultValue='john'
            />
            <FormRow 
              type='text' 
              name='lastName' 
              labelText='Last name'
              defaultValue='Doe'
            />
            <FormRow 
              type='text' 
              name='location' 
              defaultValue='john'
            />
             <FormRow 
              type='email' 
              name='email' 
              defaultValue='john@gmail.com'
            />
            <FormRow 
              type='password' 
              name='password' 
              defaultValue='*******'
            />
          
        <button type="submit" className='btn btn-block'>
          submit
        </button>
        <p>Already a member? <Link to="/login" className='member-btn' >Login</Link></p>
      </form>
  
    </Wrapper>
  )
}

export default Register