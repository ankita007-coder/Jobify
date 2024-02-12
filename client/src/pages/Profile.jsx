import React from 'react'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { Form, useOutletContext } from 'react-router-dom'
import { FormRow, SubmitButton } from '../components';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = async({request})=>{
  const formData = await request.formData();
  const file = formData.get('avatar');
  if(file && file.size>50000000){
    toast.error('Image size too large');
    return null
  }
  try {
    await customFetch.patch('/users/update-user',formData)
    toast.success('Profile updated successfully');
    return ('/dashboard/profile')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error
  }
}

const Profile = () => {
  const {user} = useOutletContext();
  const {name,lastName,location,email} =user;

  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className='form-label'>
              Select an image file (max 0.5 MB)
            </label>
            <input type="file" name="avatar" 
                    id="avatar"
                    className='form-input'
                    accept='image/*' />
          </div>
          <FormRow type="text" name='name' defaultValue={name}/>
          <FormRow type="text" name='lastName' labelText='last name' defaultValue={lastName}/>
          <FormRow type="email" name='email' defaultValue={email}/>
          <FormRow type="text" name='location' defaultValue={location}/>
          <SubmitButton formBtn={true}/>
        </div>
      </Form>
    </Wrapper>
  )
}

export default Profile