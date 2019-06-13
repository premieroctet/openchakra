import React from 'react';

import { Edit, SimpleForm, TextInput } from 'react-admin';

const BillingTitle = ({ record }) => {
        return <span>{record ? `"${record.label}"` : ''}</span>;
};

 const BillingEdit = props => (
    <Edit title={<BillingTitle />} {...props}>
<SimpleForm>

    <TextInput source='label'/>
    </SimpleForm>
    </Edit>
);

export default BillingEdit;
