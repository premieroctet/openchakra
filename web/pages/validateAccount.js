import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Layout from '../hoc/Layout/Layout';
import axios from "axios";
import { toast } from 'react-toastify';

const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
        height: '170vh',
        justifyContent: 'top',
        flexDirection: 'column',

    },
    card: {
        padding: '1.5rem 3rem',
        width: 400,
        marginTop: '100px',
    },
    cardContant: {
        flexDirection: 'column',
    },
    linkText: {
        textDecoration: 'none',
        color: 'black',
        fontSize: 12,
        lineHeight: 4.15,
    },
});

class validateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
        };
    }

    static getInitialProps ({ query: { user } }) {
        return { id_user: user }

    }

    componentDidMount() {
        const user = this.props.id_user;
        this.setState({userID: user});
    }

    onSubmit = e => {
        e.preventDefault();

        const user = {id:this.state.userID};
        axios
            .post('/myAlfred/api/users/validateAccount',user
            )
            .then(res => {
                toast.info('Compte validé');
                Router.push('/')
            })
            .catch(err =>
                console.error(err)
            );


    };

    render() {
        const { classes } = this.props;


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Valider votre inscription</Typography>
                            </Grid>
                            <form onSubmit={this.onSubmit}>

                                <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                        Valider
                                    </Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(validateAccount);
