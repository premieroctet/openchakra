import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import layoutStyle from "../../static/css/pages/layout/layoutStyle"
import Header from "../../hoc/Layout/About/Header";
import Footer from "../../hoc/Layout/About/Footer";

class OurTeam extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {style} = this.props;
        return (
            <Fragment>
                <Header/>
                <Grid className={layoutStyle.navbarTopContainer}>
                    <Grid style={{display: 'flex', flexDirection: 'column', margin: '0 auto', width: '60%'}}>
                        <h2>Notre équipe</h2>
                        <p>Coming soon !</p>
                    </Grid>
                </Grid>
                <Footer/>
            </Fragment>)
    }
}

export default (OurTeam)
