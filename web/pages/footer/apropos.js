import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import layoutStyle from "../../static/css/pages/layout/layoutStyle"
import Header from "../../hoc/Layout/About/Header";
import Footer from "../../hoc/Layout/About/Footer";

class Apropos extends React.Component {
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
                        <Grid>
                            <h2>Fondé en 2019</h2>
                            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor
                                incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation
                                ullamco
                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                in
                                reprehenderit
                                in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                                sint
                                occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est
                                laborum."</p>
                        </Grid>
                        <Grid>

                            <h2>Notre mission</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor
                                incididunt
                                ut
                                labore et dolore magna aliqua.</p>
                        </Grid>
                        <Grid>

                            <h2>Notre vision</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor
                                incididunt
                                ut
                                labore et dolore magna aliqua.</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Footer/>
            </Fragment>)
    }
}

export default (Apropos)
