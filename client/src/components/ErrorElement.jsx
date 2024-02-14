import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorElement = () => {

    const errors = useRouteError();

  return (
    <div>There was an error...</div>
  )
}

export default ErrorElement