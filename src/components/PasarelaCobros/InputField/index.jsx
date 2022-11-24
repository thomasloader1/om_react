import { useField } from 'formik'
import React from 'react'

const InputField = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props)
    
    console.log({field,meta, helpers})
    
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
            {meta.touched && meta.error && <p className="help is-danger">{meta.error}</p>}
        </div>
    )
}

export default InputField