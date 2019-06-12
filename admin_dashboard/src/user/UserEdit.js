import React from 'react';

import { Edit, SimpleForm,BooleanInput } from 'react-admin';

const UserTitle = ({ record }) => {
    return <span>{record ? `"${record.email}"` : ''}</span>;
};

const UserEdit = props => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <BooleanInput source="is_alfred" label={"C'est un Alfred ?"}/>
            <BooleanInput source="active"/>

        </SimpleForm>
    </Edit>
);

export default UserEdit;
