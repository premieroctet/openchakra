import React, { Fragment } from 'react';
import AlfredBanner from '../components/shop/AlfredBanner/AlfredBanner';
import MyBestSellers from '../components/shop/MyBestSellers/myBestSellers';
import Bio from '../components/shop/Bio/Bio';
import Review from '../components/shop/Review/Review';
import Layout from '../hoc/Layout/Layout';
import NavBarShop from '../components/NavBar/NavBarShop/NavBarShop';
import NavBarSwitchStatus from '../components/NavBar/NavBarSwitchStatus/NavBarSwitchStatus';
import About from '../components/About/About';

class shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            logged: false
        }
    }
    static getInitialProps ({ query: { id_alfred } }) {
        return { aboutId: id_alfred }
    }

    componentWillMount() {
        this.setState({id: this.props.aboutId});
        console.log(this.state.id,'test')
    }

    render() {
        return (
            <Fragment>
                <Layout>
                    <AlfredBanner shop={this.state.id}/>
                    <NavBarShop/>
                    <NavBarSwitchStatus/>
                    <About/>
                    <MyBestSellers shop={this.state.id}/>
                    <Bio shop={this.state.id}/>
                    <Review shop={this.state.id}/>
                </Layout>
            </Fragment>
        )
    };
}

export default shop;
