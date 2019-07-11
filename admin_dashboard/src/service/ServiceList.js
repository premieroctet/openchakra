import React from 'react';
import { List, Datagrid, TextField,EditButton, ArrayField, SingleFieldList,ChipField,ImageField, Filter,ReferenceInput,SelectInput} from 'react-admin';

const ServiceFilter = (props) => (
    <Filter {...props}>

        <ReferenceInput label="Catégorie" source="category" reference="category/all" allowEmpty>
            <SelectInput optionText="label" />
        </ReferenceInput>
    </Filter>
);

const ServiceList = props => (
    <List filters={<ServiceFilter/>} {...props}>
        <Datagrid rowClick="show">
            <TextField source="label" />

            <TextField source="category.label" label={'Catégorie'} />
            <ArrayField label="Equipements" source="equipments">
                <SingleFieldList>
                    <ChipField source="label" />
                </SingleFieldList>
            </ArrayField>
            <ArrayField label="Tags" source="tags">
                <SingleFieldList>
                    <ChipField source="label" />
                </SingleFieldList>
            </ArrayField>
            <ImageField source='picture'/>

            <EditButton/>
        </Datagrid>
    </List>
);

export default ServiceList;
