import { useField } from 'formik'
import React from 'react'

const SelectQuote = ({ selectName = "Seleccione las cuotas deseadas", country, ...props }) => {
    const [field, meta] = useField(props)

    const getAvailableInstallments = (countryCode) => {
        switch (countryCode) {
            case 'ch': //Chile
                return [8, 6, 3, 1];
            case 'ar':
                return [1, 3, 6, 9, 12, 18, 24];
            default:
                return [12, 9, 6, 3, 1];
        }
    }

    const getIsoCode = (country) => {
        switch (country) {
            case 'Chile': 
                return 'ch';
            case 'Argentina': 
                return 'ar';
            case 'Mexico':
                return 'mx';
            default:
                return 'usd';
        }
    }

    const countryCode = getIsoCode(country)
    const options = getAvailableInstallments(countryCode)

    return (
        <div className={`select ${meta.error ? 'is-danger' : 'is-link'}`}>
            <label className='label'>{selectName}</label>
            <select {...props} {...field}>
                <option defaultValue={0}>0</option>
                {
                    options.map((option, index) => <option key={option} value={option} >{option}</option>)
                }
            </select>
        </div>
    )
}

export default SelectQuote