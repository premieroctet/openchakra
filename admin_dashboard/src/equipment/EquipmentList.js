import React from 'react';
import { List, Datagrid, TextField,EditButton} from 'react-admin';


const EquipmentList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="label" />
            <EditButton/>
        </Datagrid>
    </List>
);

export default EquipmentList;
