import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import AlfredBanner from '../components/shop/AlfredBanner/AlfredBanner';
import MyBestSellers from '../components/shop/MyBestSellers/myBestSellers';
import Bio from '../components/shop/Bio/Bio';
import Review from '../components/shop/Review/Review';
import Layout from '../hoc/Layout/Layout';
import NavBarShop from '../components/NavBar/NavBarShop/NavBarShop';
import About from '../components/About/About';
import SkillsAlfred from '../components/SkillsAlfred/SkillsAlfred';
import Typography from '@material-ui/core/Typography';

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
                    {/*<NavBarSwitchStatus/>*/}
                    <Grid style={{marginLeft: '5%', marginRight: '5%'}}>
                        <Grid style={{display:'flex', alignItems: 'baseline', justifyContent: 'space-evenly'}}>
                            <Grid style={{display:'flex', alignItems: 'center', flexDirection: 'column'}}>
                                <Typography variant="h6" style={{width: '100%'}}>
                                    A propos de Maëlis
                                </Typography>
                                <About/>
                            </Grid>
                            <Grid style={{display:'flex', alignItems: 'center', flexDirection: 'column'}}>
                                <Typography variant="h6" style={{width: '100%'}}>
                                   Les compliments reçus par Maelis
                                </Typography>
                                <SkillsAlfred/>
                            </Grid>
                        </Grid>
                        <Grid style={{display: 'flex'}}>
                            <Grid>
                                <Typography variant="h6" style={{width: '100%'}}>
                                    Les compliments reçus par Maelis
                                </Typography>
                            </Grid>
                        </Grid>
                        <MyBestSellers shop={this.state.id}/>
                        <Bio shop={this.state.id}/>
                        <Review shop={this.state.id}/>
                    </Grid>
                </Layout>
            </Fragment>
        )
    };
}

export default shop;
