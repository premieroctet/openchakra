import React from 'react';

import { Create, SimpleForm, TextInput } from 'react-admin';



const CategoryCreate = props => (
    <Create title={'Ajouter'} {...props}>
        <SimpleForm>

            <TextInput source='label'/>
            <TextInput source='picture'/>
        </SimpleForm>
    </Create>
);

export default CategoryCreate;
