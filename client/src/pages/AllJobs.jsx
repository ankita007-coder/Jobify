import React, { createContext, useContext } from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';
import { JobsContainer, SearchContainer } from '../components';


export const loader = async({request})=>{
  console.log(request.url)
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])
  try {
    const {data} = await customFetch.get('/jobs',{
      params
    });
    return {data}
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

const AllJobsContext = createContext();
const AllJobs = () => {
  const {data} = useLoaderData();
  return (
    <>
      <AllJobsContext.Provider value={{data}}>
        <SearchContainer />
        <JobsContainer />
      </AllJobsContext.Provider>
    </>
  )
}

export const useAllJobsContext = ()=>useContext(AllJobsContext);
export default AllJobs