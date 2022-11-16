import React from 'react'

const SelectQuote = ({ selectName, options}) => {
    return (
        <div className="select is-info">
            <select>
                <option disabled>{selectName}</option>
                {
                    options.map( option => <option key={option} value={option}>{option}</option> )
                }
            </select>
        </div>
    )
}

export default SelectQuote