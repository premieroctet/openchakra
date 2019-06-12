import React from 'react';

import { Create, SimpleForm, TextInput, BooleanInput } from 'react-admin';

export const UserCreateCustom = props => (
    <Create {...props}>
<SimpleForm>

    <BooleanInput source="active" />
    <BooleanInput source="is_alfred" />
    <BooleanInput source="super_alfred" />
    <BooleanInput source="is_admin" />
    <TextInput source="name" />
    <TextInput source="firstname" />
    <TextInput source="email" />
    <TextInput source="phone" />
    </SimpleForm>
    </Create>
);
