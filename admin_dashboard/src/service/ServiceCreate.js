import React from 'react';

import { Create, SimpleForm, TextInput,ReferenceInput,SelectInput,ReferenceArrayInput,SelectArrayInput } from 'react-admin';




const ServiceCreate = props => (
    <Create title={'Ajouter'} {...props}>
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
    </Create>
);

export default ServiceCreate;
