import React from 'react';
import Select from 'react-select';
import { connect } from 'formik';

function MultipleSelect(props) {

    return (
        <Select
            noOptionsMessage={() => props.noOption}
            closeMenuOnSelect={false}
            placeholder={props.placeholder}
            isMulti
            isDisabled={props.disabled}
            options={props.option}
            onChange={props.update}
            theme={theme => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary: '#2FBCD3',
                }
            })}
        />
    );
}

export default connect(MultipleSelect);
