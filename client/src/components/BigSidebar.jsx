import Wrapper from '../assets/wrappers/BigSidebar'
import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import Logo from './Logo';
import Navlinks from './Navlinks';

const BigSidebar = () => {
  const {showSidebar} = useDashboardContext();
  return (
    <Wrapper>
      <div className={showSidebar?'sidebar-container show-sidebar':
    'sidebar-container'}>
      <div className="content">
        <header>
          <Logo/>
        </header>
        <Navlinks/>
      </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar