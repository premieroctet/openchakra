import React, { Fragment } from 'react';
import Layout from '../hoc/Layout/Layout';
import BodySearch from '../components/prestation-by-service/BodySearch/BodySearch';

class Service extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

    static getInitialProps ({ query: { service } }) {
        return { serviceId: service }

    }

    componentWillMount() {
        this.setState({id: this.props.serviceId});
    }

    render() {
        return (
            <Fragment>
                <Layout>
                    <BodySearch service={this.state.id} />
                </Layout>
            </Fragment>

        )
    }
}


export default Service;
