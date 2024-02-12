import React from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify';
import { Form, redirect, useLoaderData, useNavigation } from 'react-router-dom';
import { FormRow, FormRowSelect, SubmitButton } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';

export const loader = async({params})=>{
  try {
    const {data} = await customFetch.get(`/jobs/${params.id}`);
    //console.log(data)
    return data

  } catch (error) {
   // console.log(error)
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/all-jobs');
  }
}

export const action = async({request,params})=>{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/jobs/${params.id}`,data);
    toast.success('Job edited successfully');
    return redirect('/dashboard/all-jobs');

  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/all-jobs');
  }
}
const EditJob = () => {
  const {job} = useLoaderData();
  return (
    <>
      <Form method='post'className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position}/>
          <FormRow type="text" name="company" defaultValue={job.company}/>
          <FormRow type="text" name="jobLocation" defaultValue={job.jobLocation}/>
          <FormRowSelect name="jobStatus" 
                          labelText="job status"
                          defaultValue={job.jobStatus} 
                          list={Object.values(JOB_STATUS)}
                          />
          <FormRowSelect name="jobType" 
                          labelText="job type"
                          defaultValue={job.jobType} 
                          list={Object.values(JOB_TYPE)}
                          />   
          <SubmitButton formBtn={true}/>          
        </div>
      </Form>
    </>
  )
}

export default EditJob