import React, { Fragment } from 'react';
import NavBar from './NavBar/NavBarhome';

const Layouthome = (props) => {
    const { children } = props;

    return (
        <Fragment>
            <NavBar />
            {children}
        </Fragment>
    );
};


export default Layouthome;
