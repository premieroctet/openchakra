import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

export default class OAuth extends Component {

    state = {
        disabled: ''
    }

    startAuth = () => {
        const { provider } = this.props
        Router.push(`/myAlfred/api/authentication/${provider}`)
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
