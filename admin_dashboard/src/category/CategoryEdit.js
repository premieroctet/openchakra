import React from 'react';

import { Edit, SimpleForm, TextInput } from 'react-admin';

const CategoryTitle = ({ record }) => {
    return <span>{record ? `"${record.label}"` : ''}</span>;
};

const CategoryEdit = props => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm>

            <TextInput source='label'/>
            <TextInput source='picture'/>
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;
