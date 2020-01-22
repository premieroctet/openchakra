import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import AlfredBanner from '../components/shop/AlfredBanner/AlfredBanner';
import MyBestSellers from '../components/shop/MyBestSellers/myBestSellers';
import Bio from '../components/shop/Bio/Bio';
import Review from '../components/shop/Review/Review';
import NavBarShop from '../components/NavBar/NavBarShop/NavBarShop';
import About from '../components/About/About';
import SkillsAlfred from '../components/SkillsAlfred/SkillsAlfred';
import Typography from '@material-ui/core/Typography';
import CardPreview from '../components/CardPreview/CardPreview';
import CardAddService from '../components/CardAddService/CardAddService';
import Layout from '../hoc/Layout/Layout';
import Commentary from '../components/Commentary/Commentary';
import Link from '@material-ui/core/Link';
import AlfredConditions from '../components/AlfredConditions/AlfredConditions';

class shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            logged: false,
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
        const {classes} = this.props;
        const preventDefault = event => event.preventDefault();

        return (
            <Fragment>
                <Layout>
                    <AlfredBanner shop={this.state.id}/>
                    <NavBarShop/>
                    <Grid style={{marginLeft: '5%', marginRight: '5%'}}>
                        <Grid style={{display:'flex', alignItems: 'baseline', justifyContent: 'space-between', marginLeft: '5%', marginRight: '5%' }}>
                            <Grid style={{display:'flex', alignItems: 'center', flexDirection: 'column', marginTop: '3%'}}>
                                <About shop={this.state.id}/>
                            </Grid>
                            <Grid style={{display:'flex', alignItems: 'center', flexDirection: 'column'}}>
                                <Typography variant="h6" style={{width: '100%'}}>
                                   Les compliments reçus par Maelis
                                </Typography>
                                <SkillsAlfred/>
                            </Grid>
                        </Grid>
                        <Grid style={{display: 'flex', marginLeft: '5%', marginRight: '5%', flexDirection: 'column', marginTop: '3%'}}>
                            <Grid style={{width: '100%'}}>
                                <Typography variant="h6">
                                    Les compliments reçus par Maelis
                                </Typography>
                            </Grid>
                            <Grid container style={{marginTop:'3%'}} spacing={10}>
                                <Grid container item lg={4}>
                                    <CardPreview/>
                                </Grid>
                                <Grid container item lg={4}>
                                    <CardPreview/>
                                </Grid>
                                <Grid container item lg={4}>
                                    <CardPreview/>
                                </Grid>
                                <Grid container item lg={4}>
                                    <CardPreview/>
                                </Grid>
                                <Grid container item lg={4}>
                                    <CardAddService/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid>
                            <AlfredConditions/>
                        </Grid>
                        <Grid style={{marginLeft: '5%', marginRight: '5%', marginTop: '3%'}}>
                            <Grid>
                                <h3>Commentaires</h3>
                            </Grid>
                            <Grid>
                                <Grid style={{width : '100%'}}>
                                    <Commentary/>
                                </Grid>
                                <hr style={{marginTop: 30, marginBottom: 30}}/>
                                <Grid style={{width : '100%'}}>
                                    <Commentary/>
                                </Grid>
                                    <hr style={{marginTop: 30, marginBottom: 30}}/>
                                <Grid style={{width : '100%'}}>
                                    <Commentary/>
                                </Grid>
                            </Grid>
                            <Grid style={{marginTop:50, marginBottom: 50}}>
                                <Typography>
                                    <Link href="#" onClick={preventDefault}>
                                        Voir plus de commentaires
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Layout>
            </Fragment>
        )
    };
}

export default shop;
