import React, { Fragment } from 'react';
import AlfredBanner from '../components/shop/AlfredBanner/AlfredBanner';
import CanDo from '../components/shop/CanDo/CanDo';
import MyBestSellers from '../components/shop/MyBestSellers/myBestSellers';
import Bio from '../components/shop/Bio/Bio';
import Review from '../components/shop/Review/Review';
import Layout from '../hoc/Layout/Layout';





class shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }
    static getInitialProps ({ query: { id } }) {
        return { aboutId: id }

    }

    componentWillMount() {
        this.setState({id: this.props.aboutId});
    }

    render() {



        return (
            <Fragment>
                <Layout>
                    <AlfredBanner shop={this.state.id}/>
                    <CanDo shop={this.state.id}/>
                    <MyBestSellers/>
                    <Bio shop={this.state.id}/>
                    <Review/>
                </Layout>
            </Fragment>
        )
    };
}

export default shop;
