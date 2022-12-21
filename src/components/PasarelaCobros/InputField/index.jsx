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
                    className={meta.error ? 'input is-danger' : 'input'}
                    {...field}
                    {...props}
                />
            </div>
        </div>
    )

}

export default InputField