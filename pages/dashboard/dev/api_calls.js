import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import axios from 'axios';
import APIS from './apis_list';
import Layout from '../../../hoc/Layout/Layout';
import cookie from 'react-cookies';

const jwt = require('jsonwebtoken');
const styles = theme => ({
    signupContainer: {
        alignItems: 'center',
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

class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_admin: '',
        }
    }

    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const auth = cookie.load('token')
        if(!auth) {
            Router.push('/login')
        } else {


            const token = auth.split(' ')[1];
            const decode = jwt.decode(token);
            this.setState({is_admin: decode.is_admin});
        }
    }

    get_apis() {
      //return ['/myAlfred/api/job/all', '/myAlfred/api/shop/all']
      return APIS;
    }

    get_component(url, index) {
      const regex = /:([a-z_]+)/g;
      const found = url.match(regex) || []

return (
                        <div><Button type="button"
                        onClick={() => {
                                let conv_url = url;
                                found.map((patt) => {
                                  let id = index+"_"+patt.substring(1);
                                  conv_url = url.replace(patt, this.state[id]);                                  
                                })
                                axios.get(conv_url).then(response => {
                                  this.setState({[url]: JSON.stringify(response.data, null, 2)});
                                }
                                ).catch((err) => {this.setState({[url]: "ERREUR:\n"+JSON.stringify(err, null, 2)})});
                              }}
                         >{url}</Button>
                        { found.map(patt => { 
                          let id = index+"_"+patt.substring(1);
                          return (
                          <input value={patt.substring(1)} onChange={(e)=>{this.setState({[id]: e.target.value})}}/> )
                        })
                        }
                        <textarea value={this.state[url]} /></div>)
    }
    render() {
        const { classes } = this.props;
        const admin= this.state.is_admin;
        const apis = this.get_apis();
        const list =
                    <div>
                        <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography style={{ fontSize: 30 }}>Appels toutes APIs</Typography>
                        </Grid>
                        { apis.map((url, index) => {  return this.get_component(url, index);
                        })}

                    </div>;
        const refused = <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography style={{ fontSize: 30 }}>Accès refusé</Typography>
        </Grid>;

        return (
             <Layout><br/>
                        <Grid>
                            {admin ? list : refused}

                        </Grid>
             </Layout>
        );
    };
}

export default withStyles(styles)(home);
