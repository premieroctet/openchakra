import React from 'react';
import Layout from '../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import setAuthToken from '../utils/setAuthToken';

const styles = {
    loginContainer: {
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    card: {
        padding: '1.5rem 3rem',
        width: 400,
    },
    cardContant: {
        flexDirection: 'column',
    },
    linkText: {
        textDecoration: 'none',
        color: 'black',
        fontSize: 12,
    },
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'logged':false
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({'logged':true})
        }
    }

    logout() {
        localStorage.removeItem('token');
        // Remove auth header for future requests
        setAuthToken(false);
        window.location.reload();
};

     render()  {
         const { classes } = this.props;
        const test = this.state.logged;
         const ok = <a href='' onClick={this.logout}>Connecté</a>;
        const pasok = 'Déconnecté';
    return (
<Layout>
    <Grid container className={classes.loginContainer}>
<div>
         {test ? ok : pasok}
</div>
    </Grid>
</Layout>
    )
}


}



export default withStyles(styles)(Home);
