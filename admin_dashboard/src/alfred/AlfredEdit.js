import React from 'react';

import { Edit, SimpleForm, BooleanInput } from 'react-admin';

const AlfredTitle = ({ record }) => {
    return <span>{record ? `"${record.email}"` : ''}</span>;
};

const AlfredEdit = props => (
    <Edit title={<AlfredTitle />} {...props}>
        <SimpleForm>
            <BooleanInput source="is_alfred"/>
            <BooleanInput source="super_alfred"/>
            <BooleanInput source="active"/>

        </SimpleForm>
    </Edit>
);

export default AlfredEdit;
