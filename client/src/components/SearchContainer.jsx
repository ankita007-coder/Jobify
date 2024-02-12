import React from 'react'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { Form, Link } from "react-router-dom";
import { FormRow, FormRowSelect, SubmitButton } from ".";
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../utils/constants';

const SearchContainer = () => {



  return (
    <Wrapper>
      <Form>
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow type="search" 
                    name="search" 
                    defaultValue="a"
                    />
          <FormRowSelect labelText="job status" 
                          name="jobStatus"
                          list={['all',...Object.values(JOB_STATUS)]}
                          defaultValue='all'/>
          <FormRowSelect labelText="job type"
                          name="jobType"
                          list={['all',...Object.values(JOB_TYPE)]}
                          defaultValue='all'/>
          <FormRowSelect labelText="job type"
                                    name="sort"
                                    list={Object.values(JOB_SORT_BY)}
                                    defaultValue={JOB_SORT_BY.NEWEST_FIRST}/>
          <Link to='/dashboard/all-jobs' 
                className='btn form-btn delete-btn' >
                 Reset Search Values
                </Link>
          <SubmitButton formBtn={true}/>
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer