import React from 'react';
import { Show, TabbedShowLayout, TextField,DateField,NumberField,Tab } from 'react-admin';

const AlfredTitle = ({ record }) => {
    return <span>{record ? `"${record.email}"` : ''}</span>;
};
const AlfredShow = (props) => (
    <Show title={<AlfredTitle/>} {...props}>
        <TabbedShowLayout>
            <Tab label={"Informations"}>
                <TextField source="name" label={"Nom"} />
                <TextField source="firstname" label={"Prénom"} />
                <TextField source="email"/>
                <DateField source="birthday" label={"Date de naissance"} />
                <TextField source="phone" label={"Téléphone"} />
                <TextField source="job" label={"Métier"} />
            </Tab>
            <Tab label={"Statistiques"} path={"statistiques"}>
                <NumberField source="score" label={"Note"}/>
                <NumberField source="number_of_reviews" label={"Nombre d'avis"}/>
                <NumberField source="number_of_views" label={"Nombre de vues"}/>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export default AlfredShow;
