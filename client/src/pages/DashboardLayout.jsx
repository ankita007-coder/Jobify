import React, { createContext, useContext, useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate, useNavigation } from 'react-router-dom'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { BigSidebar, Loading, Navbar, SmallSidebar } from '../components'
import { checkDefaultTheme } from '../App';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';


const userQuery={
  queryKey:['user'],
  queryFn: async()=>{
    const {data}=await customFetch.get('/users/current-user')
    return data
  }
}
export const loader =(queryClient)=> async()=>{
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect('/');
  }
}


const DashboardContext = createContext();

const DashboardLayout = ({queryClient}) => {
  const {user} = useQuery(userQuery).data;
  const [showSidebar,setShowSidebar] = useState(false);
  const [isDarkTheme,setIsDarkTheme] = useState(checkDefaultTheme());
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state==='loading';

  const [isAuthError,setIsAuthError] = useState(false);
  const toggleDark = ()=>{
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme',newDarkTheme)
    localStorage.setItem('dark-theme',newDarkTheme);
  }
  const toggleSidebar = ()=>{
    setShowSidebar(!showSidebar);
  }
  const logout = async()=>{
    await customFetch.get('/auth/logout');
    queryClient.invalidateQueries();
    toast.success('Logging out');
    navigate('/')
  };
  customFetch.interceptors.response.use((response)=>{
    return response
  },(error)=>{
    if(error?.response?.status===401){
      setIsAuthError(true);
    }
    return Promise.reject(error);
  })

  useEffect(()=>{
    if(isAuthError){
       logout();
    }
  },[isAuthError]);

  return (
    <DashboardContext.Provider value={{isDarkTheme,
                                      showSidebar,
                                      user,
                                      logout,
                                      toggleDark,
                                      toggleSidebar}}>
      <Wrapper>
      <main className="dashboard">
        <SmallSidebar/>
        <BigSidebar/>
        <div>
        <Navbar/>
        <div className="dashboard-page">
          {
            isPageLoading ? (<Loading/>):(<Outlet context={{user}}/>)
          }
        </div>
        </div>       
      </main>  
    </Wrapper>
    </DashboardContext.Provider>
    
  )
}

export const useDashboardContext = ()=>useContext(DashboardContext);
export default DashboardLayout