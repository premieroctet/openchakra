import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, DateField } from 'react-admin';

const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="name" label={"Nom"} />
            <TextField source="firstname" label={"Prénom"} />
            <EmailField source="email" />
            <DateField source="creation_date" label={"Date d'inscription"} />
            <EditButton/>
        </Datagrid>
    </List>
);

export default UserList;
