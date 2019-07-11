import React from 'react';
import { List, Datagrid, TextField, EmailField, BooleanField } from 'react-admin';

export const UserList = props => (
    <List {...props}>
<Datagrid>
    <TextField source="name" label={"Nom"} />
    <TextField source="firstname" label={"Prénom"} />
    <EmailField source="email" />
    <BooleanField source="is_alfred" label={"C'est un Alfred ?"} />

    </Datagrid>
    </List>
);
