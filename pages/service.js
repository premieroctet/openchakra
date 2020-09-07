import React, {Fragment} from 'react';
import Layout from '../hoc/Layout/Layout';
import SubBar from '../components/service-by-category/SubBar/SubBar';
import BodySearch from '../components/service-by-category/BodySearch/BodySearch';

class Service extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

    static getInitialProps ({ query: { category } }) {
        return { categoryId: category }

    }

    componentWillMount() {
        this.setState({id: this.props.categoryId});
    }

    render() {
        return (
            <Fragment>
                <Layout>
                    <SubBar category={this.state.id} />
                    <BodySearch category={this.state.id} />
                </Layout>
            </Fragment>

        )
    }
}


export default Service;
