import React from 'react';

import { Edit, SimpleForm, TextInput,BooleanInput } from 'react-admin';

const AdminTitle = ({ record }) => {
    return <span>{record ? `"${record.email}"` : ''}</span>;
};

const AdminEdit = props => (
    <Edit title={<AdminTitle />} {...props}>
        <SimpleForm>

            <TextInput source='name' label="Nom"/>
            <TextInput source='firstname' label="Prénom"/>
            <TextInput source='email' type="email"/>
            <TextInput source='phone' label="Téléphone"/>
            <BooleanInput source="active"/>

        </SimpleForm>
    </Edit>
);

export default AdminEdit;
