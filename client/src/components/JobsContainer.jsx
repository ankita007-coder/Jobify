import React from 'react'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobsContext } from '../pages/AllJobs'
import Job from './Job';

const JobsContainer = () => {
   const {data} = useAllJobsContext();
   console.log(data.length)

   if(data && data.length===0){
    return (
        <Wrapper>
            <h2>No jobs to display.......</h2>
        </Wrapper>
    )
   }
  return (
    <Wrapper>
        <div className="jobs">
            {data.map((job)=>{
                return <Job key={job._id} {...job}/>
            })}
        </div>
    </Wrapper>
  )
}

export default JobsContainer