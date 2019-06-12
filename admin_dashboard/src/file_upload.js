import React from 'react';
const file_upload= ({ input, type, meta: { touched, error, warning } }) => {
    delete input.value

    return (
        <div>
            <label htmlFor={input.name}>
                <input {...input} type={type}/>
            </label>
        </div>
    )
};

export default file_upload;
