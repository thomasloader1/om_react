import { useField } from 'formik'
import React from 'react'

const SelectQuote = ({ selectName = "Seleccione las cuotas deseadas", options, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <div className={`select ${meta.error ? 'is-danger' : 'is-link'}`}>
            <label className='label'>{selectName}</label>
            <select {...props} {...field}>
                {
                    options.map( option => <option key={option} value={option}>{option}</option> )
                }
            </select>
        </div>
    )
}

export default SelectQuote