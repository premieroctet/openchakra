import React from 'react';

import { Edit, SimpleForm, BooleanInput } from 'react-admin';

const UserTitle = ({ record }) => {
    return <span>{record ? `"${record.email}"` : ''}</span>;
};
export const UserEditCustom = props => (
    <Edit title={<UserTitle/>} {...props}>
<SimpleForm>

    <BooleanInput source="active" />
    <BooleanInput source="super_alfred" />
    <BooleanInput source="is_admin" />
    </SimpleForm>
    </Edit>
);
