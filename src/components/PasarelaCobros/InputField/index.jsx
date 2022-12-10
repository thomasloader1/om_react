import { useField } from 'formik'
import React from 'react'

const InputField = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    
    return (
        <div className="field">
            <label htmlFor={props.id} className="label">
                {label}
            </label>
            <div className="control">
                <input
                    placeholder="2000339000004553081"
                    className={meta.touched && meta.error ? 'input is-danger' : 'input'}
                    type="text"
                    {...field}
                    {...props}
                />
            </div>
        </div>
    )
}

export default InputField