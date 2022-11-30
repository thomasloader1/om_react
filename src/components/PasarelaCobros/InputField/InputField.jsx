import { useField } from 'formik'
import React from 'react'
import { Form } from 'react-bulma-components'

const InputField = ({label, key,...props}) => {
    const [field, meta] = useField(props)
    return (
        <Form.Field key={key} style={{ marginBottom: '0.7rem' }}>
            <Form.Label>{label}</Form.Label>
            <Form.Control>
                <Form.Input
                    className={meta.touched && meta.error ? `${props.className} is-danger` : props.className}
                    type="text"
                    {...field}
                    {...props}
                />
                {meta.touched && meta.error && (
                    <p className="help is-danger">{meta.error}</p>
                )}
            </Form.Control>
        </Form.Field>
    )
}

export default InputField