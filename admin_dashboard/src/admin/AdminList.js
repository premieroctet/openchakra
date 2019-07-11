import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, BooleanField,DateField } from 'react-admin';

 const AdminList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" label={"Nom"} />
            <TextField source="firstname" label={"Prénom"} />
            <EmailField source="email" />
            <BooleanField source="active"/>
            <DateField source="creation_date" label={"Date de création"}/>
            <EditButton/>
        </Datagrid>
    </List>
);

 export default AdminList;
