import React from 'react'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { Form, Link, useSubmit } from "react-router-dom";
import { FormRow, FormRowSelect, SubmitButton } from ".";
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';


const customStyle={
  marginTop:'35px',
  textAlign: 'center'
}
const SearchContainer = () => {
  const {searchValues}= useAllJobsContext();
  const {search,jobStatus,jobType,sort} = searchValues
  const submit= useSubmit();

  const debounce = (onChange)=>{
    return (e)=>{
      let timer;
      const form = e.currentTarget.form
      clearTimeout(timer);
      timer = setTimeout(()=>onChange(form),1500) 
    }
  }


  return (
    <Wrapper>
      <Form className='form'>
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow type="search" 
                    name="search" 
                    defaultValue={search}
                    onChange={debounce((form)=>
                      {
                        submit(form)
                      }
                      )}
                    />
          <FormRowSelect labelText="job status" 
                          name="jobStatus"
                          list={['all',...Object.values(JOB_STATUS)]}
                          defaultValue={jobStatus}
                          onChange={(e)=>{submit(e.currentTarget.form)}}
                          />
          <FormRowSelect labelText="job type"
                          name="jobType"
                          list={['all',...Object.values(JOB_TYPE)]}
                          defaultValue={jobType}
                          onChange={(e)=>{submit(e.currentTarget.form)}}
                          />
          <FormRowSelect labelText="job type"
                          name="sort"
                          list={Object.values(JOB_SORT_BY)}
                          defaultValue={sort}
                          onChange={(e)=>{submit(e.currentTarget.form)}}
                          />
          <Link to='/dashboard/all-jobs' 
                className='btn btn-block form-btn delete-btn'
                style={customStyle} >
                 Reset Search Values
                </Link>
        </div>
        
      </Form>
    </Wrapper>
  )
}

export default SearchContainer