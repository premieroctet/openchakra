import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router';

//import getHost from '../utils/mailing'
const getHost = () => {return 'https://lvh.me/'}

export default class OAuth extends Component {

    state = {
        user: {},
        disabled: ''
    }

    startAuth = () => {
        const { provider } = this.props
        const url = new URL(`/myAlfred/api/authentication/${provider}`, getHost()).toString()
        Router.push(url)
    }

    render() {
        const { provider } = this.props
        const { disabled } = this.state

        return (
            <div>
                {
                    <div className='button-wrapper fadein-fast'>
                        <button
                            onClick={this.startAuth}
                            className={`${provider} ${disabled} button`}
                        >
                        </button>
                    </div>
                }
            </div>
        )
    }
}

OAuth.propTypes = {
    provider: PropTypes.string.isRequired,
}
