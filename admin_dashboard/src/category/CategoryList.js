import React from 'react';
import { List, Datagrid, TextField,EditButton, ImageField} from 'react-admin';


const CategoryList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="label" />
            <ImageField source="picture"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export default CategoryList;
