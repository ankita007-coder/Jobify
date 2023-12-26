import React, { createContext, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import { checkDefaultTheme } from '../App';


const DashboardContext = createContext();

const DashboardLayout = () => {
  const user= {name:'john'};
  const [showSidebar,setShowSidebar] = useState(false);
  const [isDarkTheme,setIsDarkTheme] = useState(checkDefaultTheme());
  
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
    console.log('logout user');
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
          <Outlet />
        </div>
        </div>       
      </main>  
    </Wrapper>
    </DashboardContext.Provider>
    
  )
}

export const useDashboardContext = ()=>useContext(DashboardContext);
export default DashboardLayout