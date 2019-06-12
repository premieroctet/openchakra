import React from 'react';

import {Create, SimpleForm, TextInput,ReferenceInput,SelectInput,ReferenceArrayInput,SelectArrayInput } from 'react-admin';


const PrestationCreate = props => (
    <Create title={"Ajouter"} {...props}>
        <SimpleForm>

            <TextInput source='label'/>
            <TextInput source='price'/>
            <ReferenceInput label="Catégorie" source="category" reference="category/all">
                <SelectInput optionText="label" />
            </ReferenceInput>
            <ReferenceInput label="Service" source="service" reference="service/all">
                <SelectInput optionText="label" />
            </ReferenceInput>
            <ReferenceInput label="Filtre de présentation" source="filter_presentation" reference="filterPresentation/all">
                <SelectInput optionText="label" />
            </ReferenceInput>
            <ReferenceArrayInput label="Filtres de recherche" source="search_filter" reference="searchFilter/all">
                <SelectArrayInput optionText="label" />
            </ReferenceArrayInput>
            <ReferenceInput label="Méthode de facturation" source="billing" reference="billing/all">
                <SelectInput optionText="label" />
            </ReferenceInput>
            <ReferenceInput label="Métier" source="job" reference="job/all">
                <SelectInput optionText="label" />
            </ReferenceInput>
            <ReferenceInput label="Méthode de calcul" source="calculating" reference="calculating/all">
                <SelectInput optionText="label" />
            </ReferenceInput>

        </SimpleForm>
    </Create>
);

export default PrestationCreate;
