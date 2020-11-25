import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

const handler = (href) => Router.push(href);

const Link = ({
                   className, children, href, ...rest
               } = {}) => (
    <a style={{
        cursor: 'pointer'

    }} onClick={() => handler(href)} className={className} {...rest}>{children}</a>
);

Link.propTypes = {
    className: PropTypes.string,
    href: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    children: PropTypes.node
}

export default Link