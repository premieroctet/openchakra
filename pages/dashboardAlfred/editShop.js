import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import axios from "axios";
import moment from 'moment';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";

moment.locale('fr');

const { config } = require('../../config/config');
const url = config.apiUrl;
class editShop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            is_alfred: false


        };
    }

    componentDidMount() {

        localStorage.setItem('path',Router.pathname);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios
            .get(url+'myAlfred/api/users/current')
            .then(res => {
                let user = res.data;
                this.setState({user:user});



                if(user.is_alfred) {
                    this.setState({is_alfred: true})
                }

            })
            .catch(err => {
                    console.log(err);
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'})
                }
            );
    }


    render() {

        const {user} = this.state;
        const {is_alfred} = this.state;
        const unauthorized = <h3>Accès refusé</h3>;


        return (
            <Fragment>
                <Layout>
                    <div style={{width: 1000, margin: '0 auto',marginTop: 200}}>
                        {is_alfred ?


                                    <a href={"/dashboardAlfred/editPictureBanner"}>

                                        Modifier ma photo de bannière

                                    </a>


                            : unauthorized}
                    </div>

                </Layout>
            </Fragment>
        );
    };
}

export default editShop;
