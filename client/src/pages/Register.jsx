import React from 'react'
import {Form, Link, redirect, useNavigation} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterPage';
import { FormRow,Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

//action to submit register form
export const action = async({request})=>{
  const formData = await request.formData();
  console.log(formData)
  const data= Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register',data);
    toast.success('Registration successful')
    return redirect('/login')
    
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error
  }
}

const Register = () => {

  const navigation = useNavigation();
  console.log(navigation)
  const isSubmitting = navigation.state==='submitting';
  return (
    <Wrapper>
     <Form className='form' method="post">
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
          
        <button type="submit" className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...':'submit'}
        </button>
        <p>Already a member? <Link to="/login" className='member-btn' >Login</Link></p>
        </Form>
  
    </Wrapper>
  )
}

export default Register