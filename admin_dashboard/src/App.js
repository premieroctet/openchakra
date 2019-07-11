import React from 'react';
import {fetchUtils } from 'react-admin';
import { Admin, Resource, Login} from 'react-admin';
import authProvider from './authProvider';
import { UserList } from './users';
import Dashboard from './Dashboard';
import themeReducer from './themeReducer';
import { Layout } from './layout';
import customRoutes from './routes';
import user from './user';
import alfred from './alfred';
import admin from './admin';
import billing from './billing';
import category from './category';
import equipment from './equipment';
import service from './service';
import prestation from './prestation';
import UserIcon from '@material-ui/icons/Group';


import restProvider from './customProvider';



const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', token);


    return fetchUtils.fetchJson(url, options);
};
const dataProvider = restProvider('http://localhost:3122/myAlfred/api/admin',httpClient);

const App = () => (

        <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider} login={Login} appLayout={Layout} customReducers={{ theme: themeReducer }} customRoutes={customRoutes} >
            <Resource name="users/all" list={UserList} icon={UserIcon} options={{ label: 'Tous les utilisateurs' }} />
            <Resource name="users/users" {...user} options={{ label: 'Liste utilisateurs simples' }} />
            <Resource name="users/alfred" {...alfred} options={{ label: 'Liste Alfred' }} />
            <Resource name="users/admin" {...admin} options={{ label: 'Administrateurs' }}  />
            <Resource name="billing/all" {...billing} options={{ label: 'Méthodes de facturation' }} />
            <Resource name="calculating/all" {...billing} options={{ label: 'Calculateur' }} />
            <Resource name="filterPresentation/all" {...billing} options={{ label: 'Filtres de présentation' }} />
            <Resource name="job/all" {...billing} options={{ label: 'Métier' }} />
            <Resource name="searchFilter/all" {...billing} options={{ label: 'Filtres de recherche' }} />
            <Resource name="tags/all" {...billing} options={{ label: 'Tags' }} />
            <Resource name="category/all" {...category} options={{ label: 'Catégories' }} />
            <Resource name="equipment/all" {...equipment} options={{ label: 'Equipements' }} />
            <Resource name="service/all" {...service} options={{ label: 'Services' }} />
            <Resource name="prestation/all" {...prestation} options={{ label: 'Prestations' }} />

    </Admin>


);

export default App;
