import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Footer from '../../hoc/Layout/Footer/Footer';
import { toast } from 'react-toastify';






const { config } = require('../../config/config');
const url = config.apiUrl;  

const styles = theme => ({
    bigContainer: {
        marginTop: 68,
        flexGrow: 1,
    },
    marginbot: {
        marginBottom: '3.5%',
    },
    hiddenone: {
        [theme.breakpoints.down('sm')]: {
            display: 'none!important',
        },
    },
    revealedone: {
        [theme.breakpoints.up('md')]: {
            display: 'none!important',
        },
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        borderTop: '15px solid gray',
        margin: '0 auto',
        marginTop:-28
    },
    trait:{
        width: '87%',
        marginTop: -18.5,
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent'
    },
    trait1:{
        width: '100%',
        marginTop: 2,
        marginLeft: 110,
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent'
    },
    trait2:{
        width: '87%',
        marginTop: -18.5,
        height: 4,
        backgroundColor: 'lightgray',
        borderColor: 'transparent'
    },
    trait3:{
        width: '100%',
        marginTop: 2,
        marginLeft: 110,
        height: 4,
        backgroundColor: 'rgb(47, 188, 211)',
        borderColor: 'transparent'
    },
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: 'white',
        border: '2px solid #000',

    },
    shopbar:{
        [theme.breakpoints.down('md')]: {
            display: 'none',
        }
    }

});

class Messages extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props;
        


        return (
            <Fragment>
                <Layout>
                    <Grid container className={classes.bigContainer}>
                        <Grid container justify="center" style={{backgroundColor: '#4fbdd7',marginTop: -3, height: '52px'}}>
                                <Grid item xs={1} className={classes.shopbar}></Grid>
                                <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                                    <Link href={'/myShop/services'}>
                                        <a style={{textDecoration:'none'}}>
                                            <p style={{color: "white",cursor: 'pointer'}}>Ma boutique</p>
                                        </a>
                                    </Link>
                                </Grid>
                                <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center",borderBottom: '2px solid white',zIndex:999}}>
                                    <Link href={'/myShop/messages'}>
                                        <a style={{textDecoration:'none'}}>
                                            <p style={{color: "white",cursor: 'pointer'}}>Messages</p>
                                        </a>
                                    </Link> 
                                </Grid>
                                <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                                    <Link href={'/myShop/mesreservations'}>
                                        <a style={{textDecoration:'none'}}>
                                            <p style={{color: "white",cursor: 'pointer'}}>Mes réservations</p>
                                        </a> 
                                    </Link>
                                </Grid>
                                <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                                    <Link href={'/myShop/myAvailabilities'}>
                                        <a style={{textDecoration:'none'}}>
                                            <p style={{color: "white",cursor: 'pointer'}}>Mon calendrier</p>
                                        </a>
                                    </Link>
                                </Grid>
                                <Grid item xs={2} className={classes.shopbar} style={{textAlign:"center"}}>
                                    <Link href={'/myShop/performances'}>
                                        <a style={{textDecoration:'none'}}>
                                            <p style={{color: "white",cursor: 'pointer'}}>Performance</p>
                                        </a>
                                    </Link>
                                </Grid>

                            </Grid>
                        <div style={{backgroundImage:'url(../../static/background/pagesina.svg)',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover', width: '100%', height: '100vh'}}></div>
                    </Grid>
                </Layout>
                <Footer/>

               

            </Fragment>
        );
    };
}



export default withStyles(styles)(Messages);



