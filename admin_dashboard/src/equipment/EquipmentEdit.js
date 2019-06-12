import React from 'react';

import { Edit, SimpleForm, TextInput } from 'react-admin';



const EquipmentTitle = ({ record }) => {
    return <span>{record ? `"${record.label}"` : ''}</span>;
};

const EquipmentEdit = props => (
    <Edit title={<EquipmentTitle />} {...props}>
        <SimpleForm>

            <TextInput source='label'/>

        </SimpleForm>
    </Edit>
);

export default EquipmentEdit;
