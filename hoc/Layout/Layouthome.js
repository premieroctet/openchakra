import React, { Fragment } from 'react';
import NavBar from './NavBar/NavBarhome';
import Loader from '../../components/Loader';

const Layouthome = (props) => {
    const { children } = props;

    return (
        <Fragment>
            <Loader />
            <NavBar />
            {children}
        </Fragment>
    );
};


export default Layouthome;
