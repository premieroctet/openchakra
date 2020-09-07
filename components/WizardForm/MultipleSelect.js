import React from 'react';
import Select from 'react-select';
import {connect} from 'formik';

function MultipleSelect(props) {

    return (
        <Select
            noOptionsMessage={() => props.noOption}
            className="indicator"
            classNamePrefix="indicator"
            closeMenuOnSelect={false}
            placeholder={props.placeholder}
            value={props.value}
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
            styles={{
                indicatorsContainer: (styles) => {
                    return {
                        ...styles,
                        ':nth-child(1)': {
                            color: '#F8727F !important',
                        }
                    }
                }
            }}
        />
    );
}

export default connect(MultipleSelect);
