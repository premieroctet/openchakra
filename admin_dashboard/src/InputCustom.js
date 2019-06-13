import React from 'react';
import { Field } from 'redux-form';
import file_upload from "./file_upload";
const LatLngInput = () => (
    <span>
        <Field name="logo" component={file_upload} type="file" />
    </span>

);
export default LatLngInput;
