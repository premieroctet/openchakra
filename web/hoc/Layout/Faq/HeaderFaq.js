import React from 'react';
import Grid from "@material-ui/core/Grid";
import Link from 'next/link';
import {withStyles} from "@material-ui/core/styles";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const styles = theme => ({
    container: {
        padding: '20px'
    },
    title: {
        display: 'flex',
        flexDirection: 'column'
    },
    flexContent: {
        margin: '0 auto',
        color: 'white'
    },
    backLink: {
        color: 'white',
        marginTop: '10px',
        '&:hover': {
            color: 'grey'
        }
    },
    bg: {
        backgroundImage: "url('../../../static/assets/img/homePage/illuHeader.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%'
    }
});

class HeaderFaq extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid className={classes.bg}>
                <Grid className={classes.container}>
                    <a className={classes.backLink} href='javascript:history.back()'><ArrowBackIosIcon/>
                    </a>
                    <Grid className={classes.title}>
                        <h1 className={classes.flexContent}>FAQ</h1>
                        <p className={classes.flexContent}>Pour trouver vos réponses</p>
                    </Grid>
                </Grid>
            </Grid>

        )
    }

}

export default withStyles(styles)(HeaderFaq)