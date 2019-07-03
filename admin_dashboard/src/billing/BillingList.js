import React from 'react';
import { List, Datagrid, TextField,EditButton} from 'react-admin';



 const BillingList = props => (
    <List {...props}>
<Datagrid>
<TextField source="label" />

    <EditButton/>
    </Datagrid>
    </List>
);

export default BillingList;
