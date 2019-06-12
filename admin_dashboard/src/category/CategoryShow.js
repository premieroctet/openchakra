import React from 'react';
import { Show, SimpleShowLayout, TextField, ImageField} from 'react-admin';

const CategoryTitle = ({ record }) => {
    return <span>{record ? `"${record.label}"` : ''}</span>;
};
 const CategoryShow = (props) => (
    <Show title={<CategoryTitle/>} {...props}>
        <SimpleShowLayout>
            <TextField source="label" />
            <ImageField source="picture" />
        </SimpleShowLayout>
    </Show>
);

export default CategoryShow;
