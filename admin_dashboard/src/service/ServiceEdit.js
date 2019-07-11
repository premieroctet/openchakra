import React from 'react';

import { Edit, SimpleForm, TextInput,ReferenceInput,SelectInput,ReferenceArrayInput,SelectArrayInput } from 'react-admin';



const ServiceTitle = ({ record }) => {
    return <span>{record ? `"${record.label}"` : ''}</span>;
};

const ServiceEdit = props => (
    <Edit title={<ServiceTitle />} {...props}>
        <SimpleForm>

            <TextInput source='label'/>
            <ReferenceInput label="Catégorie" source="category" reference="category/all">
                <SelectInput optionText="label" />
            </ReferenceInput>
            <ReferenceArrayInput label="Equipements" source="equipments" reference="equipment/all">
                <SelectArrayInput optionText="label" />
            </ReferenceArrayInput>
            <ReferenceArrayInput label="Tags" source="tags" reference="tags/all">
                <SelectArrayInput optionText="label" />
            </ReferenceArrayInput>
            <TextInput source='picture'/>
        </SimpleForm>
    </Edit>
);

export default ServiceEdit;
