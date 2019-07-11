import React from 'react';
import { Show, SimpleShowLayout, TextField,NumberField,ArrayField,SingleFieldList,ChipField } from 'react-admin';

const PrestationTitle = ({ record }) => {
    return <span>{record ? `"${record.label}"` : ''}</span>;
};
const PrestationShow = (props) => (
    <Show title={<PrestationTitle/>} {...props}>
        <SimpleShowLayout>
            <TextField source="label" />
            <NumberField source="price"/>
            <TextField source="category.label" label={'Catégorie'} />
            <TextField source="service.label" label={'Service'} />
            <TextField source="filter_presentation.label" label={'Filtre de présentation'} />
            <ArrayField label="Filtres de recherches" source="search_filter">
                <SingleFieldList>
                    <ChipField source="label" />
                </SingleFieldList>
            </ArrayField>
            <TextField source="billing.label" label={'Méthode de facturation'} />
            <TextField source="job.label" label={'Métier'} />
            <TextField source="calculating.label" label={'Méthode de calcul'} />

        </SimpleShowLayout>
    </Show>
);

export default PrestationShow;
