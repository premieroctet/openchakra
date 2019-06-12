import React from 'react';
import { Show, SimpleShowLayout, TextField,DateField } from 'react-admin';

const UserTitle = ({ record }) => {
    return <span>{record ? `"${record.email}"` : ''}</span>;
};
const UserShow = (props) => (
    <Show title={<UserTitle/>} {...props}>
        <SimpleShowLayout>

                <TextField source="name" label={"Nom"} />
                <TextField source="firstname" label={"Prénom"} />
                <TextField source="email"/>
                <DateField source="birthday" label={"Date de naissance"} />
                <TextField source="phone" label={"Téléphone"} />
                <TextField source="job" label={"Métier"} />

        </SimpleShowLayout>
    </Show>
);

export default UserShow;
