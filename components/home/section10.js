import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import axios from 'axios';
import Link from 'next/link';
const { config } = require('../../config/config');
const url = config.apiUrl;

const styles = theme => ({
    container: {
        margin: 'auto',
        width: '100%',
        textAlign:'center',
        // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
        [theme.breakpoints.up('md')]: { // medium: 960px or larger
            width: 920,
        },
        [theme.breakpoints.up('xl')]: { // medium: 960px or larger
            width: 920,
        },
    },
    container1: {

        [theme.breakpoints.down('xs')]: { //  medium: 960px or larger
            marginTop: '10px!important',
        },
        [theme.breakpoints.up('sm')]: { //  medium: 960px or larger
            marginTop: '10px!important',
        },
        [theme.breakpoints.up('md')]: { //  medium: 960px or larger
            marginTop: '10px!important',
        },
        [theme.breakpoints.up('lg')]: { //  medium: 960px or larger
            marginTop: '10%',
        },
    },
    card: {

        backgroundColor:'transparent',
        textAlign:'center',
        boxShadow: `1px 3px 1px transparent`,

        // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
        [theme.breakpoints.up('xs')]: { // xs: 600px or larger
            maxWidth: 450,
        },
        [theme.breakpoints.up('sm')]: {
            maxWidth: 400,
        },
        [theme.breakpoints.up('md')]: { // medium: 960px or larger
            maxWidth: 350,
        },
    },
    media2: {
        height: 200,
        [theme.breakpoints.down('md')]: {
            width: '200px!important',
        },
        [theme.breakpoints.down('xs')]: {
            width: '200px!important',
        },
        [theme.breakpoints.down('sm')]: {
            width: '200px!important',
        },
    },
    textBox1: {
        fontFamily: 'Helvetica',
        color: 'rgba(84,89,95,0.95)',
        letterSpacing: -2,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '3%',
        marginTop: '3%',
    },
    textBox: {
        fontFamily: 'Helvetica',
        textAlign: 'center',
        fontSize: 15,
        marginBottom: '3%',
        marginTop: '3%',
    },
    separatorBlue:{
        width: '50px'
    }
});

function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

class section10 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prestations: [],
            tags: {},
        }
    }

    componentDidMount() {
        axios.get(url + 'myAlfred/api/tags/prestations/section10')
            .then(response => {
                    let data = response.data;
                    this.setState({tags:data});
                    axios.get(url + 'myAlfred/api/prestation/all/tags/' + data._id)
                        .then(res => {
                            let prestations = res.data;

                            this.setState({prestations: prestations})

                        })
                        .catch()
                }
            )
            .catch();
    }

    render() {
        const {classes, gps} = this.props;
        const {prestations} = this.state;
        const {tags} = this.state;
        const resdata = shuffleArray(prestations);
        const services = resdata.slice(0, 10).map(e => (
            <Grid item xs={12} sm={6} md={2} lg={2} key={e._id} style={{margin:'0 10px'}}>
                <Link href={'/search?service='+e._id+'&gps='+JSON.stringify(gps)}>
                <Card className={classes.card}>
                    <CardActionArea style={{cursor:'default'}}>
                        <CardMedia
                            className={classes.media2}
                            image={e.picture}
                            title={e.label}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="p" component="p" style={{fontSize:16}}>
                                {e.label}
                            </Typography>
                            <Typography component="p">
                                {e.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                </Card>
                </Link>
            </Grid>
        ));

        return (
            <Fragment>
                <div className={classes.container1}>
                    <Grid container className={classes.container}>
                        <Grid item xs={2}/>
                        <Grid item xs={8}>
                            <div>
                                <Typography variant="h4" className={classes.textBox1}>
                                    {tags.title}
                                </Typography>
                                <Grid container>
                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}/>
                                    <Grid item xs={2} sm={4} md={4}  lg={4} xl={4} style={{margin:'auto'}}>
                                        <img alt={"séparateur"} src={'../../../static/separateur-bleu.svg'} className={classes.separatorBlue}/>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}/>
                                    <Grid item xs={5}/>
                                </Grid>
                                <Typography className={classes.textBox}>
                                    {tags.description}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={2}/>
                        <div className="thewrap">
                            <section className="sectioncard">
                                {services}
                            </section>
                        </div>
                        <Grid container className="thewrap2">
                            {services}
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        );
    }
}

export default withStyles(styles)(section10);
