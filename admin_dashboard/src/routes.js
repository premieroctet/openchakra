import React from 'react';
import { Route } from 'react-router-dom';
import Configuration from './configuration/Configuration';
import Calendar from './calendar/Calendar';
import Upload from './upload/ReactUploadImage';


export default [
    <Route exact path="/configuration" component={Configuration} />,
    <Route exact path="/calendar" component={Calendar} />,
    <Route exact path="/testUpload" component={Upload} />,
];
