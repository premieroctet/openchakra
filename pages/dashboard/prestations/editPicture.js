import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Router from "next/router";
import EditPicture from '../../../components/Dashboard/EditPicture/EditPicture';


const {config} = require('../../../config/config');
const url = config.apiUrl;

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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
};


class editPicture extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            prestation: {},
            picture: null,
            typePrestation: "test"
        };


    }

    static getInitialProps ({ query: { id } }) {
        return { prestation_id: id }

    }
    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const id = this.props.prestation_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`${url}myAlfred/api/admin/prestation/all/${id}`)
            .then(response => {
                let prestation = response.data;
                this.setState({prestation: prestation});
                console.log(this.state.prestation, 'test')
            })
            .catch(err => {
                console.log(err);
                if(err.response.status === 401 || err.response.status === 403) {
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'})
                }
            });


    }

    onChange = e => {
        this.setState({picture:e.target.files[0]})
    };



    onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('picture',this.state.picture);
        const id = this.props.prestation_id;
        axios.post(`${url}myAlfred/api/admin/prestation/editPicture/${id}`,formData)
            .then(res => {

                alert('Photo modifiée avec succès');
                Router.push({pathname:'/dashboard/prestations/all'})
            })
            .catch(err => {
                console.log(err);

            })


    };



    render()  {
        const { classes } = this.props;
        const {prestation} = this.state;


        return (
            <Layout>
                <EditPicture typePrestation={this.state.typePrestation}/>
            </Layout>
        );
    };
}



export default withStyles(styles)(editPicture);
