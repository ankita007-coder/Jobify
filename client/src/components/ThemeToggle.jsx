import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import Wrapper from "../assets/wrappers/ThemeToggle";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";


const ThemeToggle = () => {
   const {isDarkTheme,toggleDark}= useDashboardContext();
  return <Wrapper onClick={toggleDark}>
    {isDarkTheme?(
        <BsFillSunFill className='toggle-btn'/>
    ):(
        <BsFillMoonFill/>
    )}
  </Wrapper>
}

export default ThemeToggle