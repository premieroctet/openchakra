import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";

export default class OAuth extends Component {

    components = {
        google: GoogleLoginButton,
        facebook: FacebookLoginButton
    };

    startAuth = () => {
        const { provider } = this.props
        Router.push(`/myAlfred/api/authentication/${provider}`)
    }

    render() {
        const { provider } = this.props
        const ProviderLoginButton = this.components[provider]
        return (
            <div>
                {
                    <ProviderLoginButton
                        onClick={this.startAuth}
                    />
                }
            </div>
        )
    }
}

OAuth.propTypes = {
    provider: PropTypes.string.isRequired,
}
