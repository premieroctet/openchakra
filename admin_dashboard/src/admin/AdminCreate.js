import React from 'react';

import { Create, SimpleForm, TextInput,DateInput } from 'react-admin';



const AdminCreate = props => (
    <Create title={"Ajouter"} {...props}>
        <SimpleForm>

            <TextInput source='name' label="Nom"/>
            <TextInput source='firstname' label="Prénom"/>
            <TextInput source='email' type="email"/>
            <TextInput source='password' type="password" label="Mot de passe"/>
            <TextInput source='password2' type="password" label="Confirmation du mot de passe"/>
            <DateInput source="birthday" label="Date de naissance"/>
            <TextInput source='phone' label="Téléphone"/>
        </SimpleForm>
    </Create>
);

export default AdminCreate;
