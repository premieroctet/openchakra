import React from 'react';
import Select from 'react-select';
import { connect } from 'formik';

function MultipleSelect(props) {

    return (
        <Select
            closeMenuOnSelect={false}
            isMulti
            isDisabled={props.disabled}
            options={props.option}
            onChange={props.update}
        />
    );
}

export default connect(MultipleSelect);
