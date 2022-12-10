import { useField } from 'formik'
import React from 'react'

const SelectQuote = ({ selectName = "Seleccione las cuotas", options, ...props}) => {
    const [field, meta] = useField(props)
    console.log("selectQuote",{field, meta})
    return (
        <div className="select is-info">
            <select {...props} {...field}>
                <option disabled>{selectName}</option>
                {
                    options.map( option => <option key={option} value={option}>{option}</option> )
                }
            </select>
            {meta.touched && meta.error && meta.error}
        </div>
    )
}

export default SelectQuote