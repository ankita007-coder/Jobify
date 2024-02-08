import React from 'react'

const FormRowSelect = ({name,labelText, list,defaultValue=''}) => {
  return (
    <div className="form-row">
        <label htmlFor={name} className='form-label'>{labelText||name}</label>
        <select name={name} id="jobStatus" className='form-select' defaultValue={defaultValue}>
            {list.map((itemValue)=>{
                return <option value={itemValue} key={itemValue}>{itemValue}</option>
            })}
        </select>
  </div>
  )
}

export default FormRowSelect