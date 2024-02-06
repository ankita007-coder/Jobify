import React, { createContext, useContext, useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import { checkDefaultTheme } from '../App';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async()=>{
  try {
    const {data}=await customFetch.get('/users/current-user')
   // console.log(data)
    return data
  } catch (error) {
    return redirect('/');
  }
}


const DashboardContext = createContext();

const DashboardLayout = () => {
  const {user} = useLoaderData();
  const [showSidebar,setShowSidebar] = useState(false);
  const [isDarkTheme,setIsDarkTheme] = useState(checkDefaultTheme());
  const navigate = useNavigate();
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
    toast.success('Logging out');
    navigate('/')
  };
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
          <Outlet context={{user}}/>
        </div>
        </div>       
      </main>  
    </Wrapper>
    </DashboardContext.Provider>
    
  )
}

export const useDashboardContext = ()=>useContext(DashboardContext);
export default DashboardLayout