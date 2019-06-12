import React from 'react';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Layout from '../../../hoc/Layout/Layout';
import axios from "axios";
import Link from "next/link";



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

class all extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        }

    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.get("http://localhost:5000/myAlfred/api/admin/tags/all")
            .then((response) => {
                let tags = response.data;
                this.setState({tags: tags})
            }).catch((error) => {
            console.log(error)
        });
    }


    render() {
        const { classes } = this.props;
        const {tags} = this.state;

        const row = tags.map(e => (
            <tr key={e._id}>
                <td>{e.label}</td>
                <td><a href={`/dashboard/tags/view?id=${e._id}`}>Modifier</a> </td>
            </tr>
        ));


        return (
            <Layout>
                <Grid container className={classes.signupContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>Tags</Typography>
                            </Grid>
                            <table>
                                <thead>
                                <tr>
                                    <th>Label</th>
                                </tr>
                                </thead>
                                <tbody>
                                {row}
                                </tbody>
                                <Grid item>
                                    <Link href={"/dashboard/tags/add"}>
                                        <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                                            Ajouter
                                        </Button>
                                    </Link>
                                </Grid>
                            </table>
                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}

export default withStyles(styles)(all);
