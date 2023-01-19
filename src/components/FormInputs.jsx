import React from 'react'

const FormInputs = (props) => {
    const { labels, onChange, id, ...inputProps } = props;
    return (
        <>
            <div className='flex flex-col p-2'>
                <label className='p-2'>{labels}</label>
                <input {...inputProps} onChange={onChange} className="p-3 rounded-lg " />
            </div>
        </>
    )
}

export default FormInputs