import React from 'react';

import { Create, SimpleForm, TextInput } from 'react-admin';



const BillingCreate = props => (
    <Create title={'Ajouter'} {...props}>
        <SimpleForm>

            <TextInput source='label'/>
        </SimpleForm>
    </Create>
);

export default BillingCreate;
