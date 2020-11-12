import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import layoutStyle from "../../static/css/pages/layout/layoutStyle"
import Header from "../../hoc/Layout/About/Header";
import Footer from "../../hoc/Layout/About/Footer";

class OurCommunity extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {style} = this.props;
        return (
            <Fragment>
                <Header/>
                <Grid className={layoutStyle.navbarTopContainer}>
                    <Grid style={{padding: '0 300px', marginBottom:'100px'}}>
                        <h2>Un monde où il fait bon vivre</h2>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor
                            incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation
                            ullamco</p>
                    </Grid>
                </Grid>
                <Footer/>
            </Fragment>)
    }
}

export default (OurCommunity)
