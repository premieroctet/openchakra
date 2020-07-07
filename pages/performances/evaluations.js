import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withStyles } from '@material-ui/core/styles';
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile';
import Commentary from '../../components/Commentary/Commentary';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './evaluations/evaluationsStyle'

moment.locale('fr');

class Evaluations extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            reviews: [],
            userId: ""
        }
        this.callDrawer = this.callDrawer.bind(this)
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.get('/myAlfred/api/users/current').then(res => {
            let user = res.data;
            if(user) {
                this.setState({
                    userId: user._id,
                })
            }
        }).catch(function (error) {
            console.log(error);
        });

        axios.get('/myAlfred/api/performances/evaluations/allReviews')
            .then(res => {
                this.setState({reviews:res.data})
            })
            .catch(err => console.error(err))

    }

    callDrawer(){
        this.child.current.handleDrawerToggle();
    }

    render() {
        const {classes} = this.props;
        const {userId} = this.state;


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer} >
                        <NavBarShop userId={this.state.userId}/>
                        <Grid className={classes.toggle}>
                            <Grid>
                                <ResponsiveDrawer ref={this.child} isActiveIndex={2} itemsDrawers={'performance'} needMargin={true}/>
                            </Grid>
                            <Grid>
                                <Grid>
                                    <IconButton
                                      color="inherit"
                                      aria-label="open drawer"
                                      edge="start"
                                      onClick={this.callDrawer}
                                      className={classes.menuButton}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} style={{paddingLeft: 55, marginBottom: '20px',minHeight:530}}>
                            <Grid container style={{marginBottom:20}}>
                                <Grid item xs={12}>
                                    <h1 style={{color: '#7E7E7E',fontWeight: '100'}}>Mes évaluations</h1>
                                </Grid>
                            </Grid>
                            <Commentary user_id={userId} alfred_mode={true} key={moment()} />
                        </Grid>
                    </Grid>
                </Layout>
              <NavbarMobile userId={this.state.userId}/>
            </Fragment>
        );
    };
}



export default withStyles(styles)(Evaluations);
