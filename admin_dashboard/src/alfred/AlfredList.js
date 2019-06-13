import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, BooleanField,DateField } from 'react-admin';

const AlfredList = props => (
    <List {...props}>
        <Datagrid rowClick='show'>
            <TextField source="name" label={"Nom"} />
            <TextField source="firstname" label={"Prénom"} />
            <EmailField source="email" />
            <BooleanField source="super_alfred" label={"Super Alfred"}/>
            <DateField source="creation_date" label={"Date de création"}/>
            <EditButton/>
        </Datagrid>
    </List>
);

export default AlfredList;
