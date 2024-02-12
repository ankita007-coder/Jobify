import React from 'react'
import Wrapper from '../assets/wrappers/StatsContainer'
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa'
import StatItem from './StatItem'

const StatsContainer = ({defaultStats}) => {

  const stats= [
    {
      title: 'pending application',
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling/>,
      color: '#e9b949',
      bcg: '#fcefc7'
    },  
    {
      title: 'interview application',
      count: defaultStats?.interview ||0,
      icon: <FaCalendarCheck/>,
      color: '#647acb',
      bcg: '#e0e8f9'
    },
    {
      title: 'jobs declined',
      count: defaultStats?.declined || 0,
      icon: <FaBug/>,
      color: '#d66a6a',
      bcg: '#ffeeee'
    } 
  ]
  return (
    <Wrapper>
      {
        stats.map((stat)=>{
          return <StatItem key={stat.title} {...stat}/>
        })
      }
    </Wrapper>
  )
}

export default StatsContainer