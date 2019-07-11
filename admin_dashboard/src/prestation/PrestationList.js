import React from 'react';
import { List, Datagrid, TextField,EditButton, ArrayField, SingleFieldList,ChipField,NumberField} from 'react-admin';


const PrestationList = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="label" />
            <NumberField source="price" label={'Prix'}/>
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



            <EditButton/>
        </Datagrid>
    </List>
);

export default PrestationList;
