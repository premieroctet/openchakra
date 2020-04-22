import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Document,Page } from 'react-pdf'
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



import Layout from '../../../hoc/Layout/Layout';
import axios from 'axios';
import Router from "next/router";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = {
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 70,
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

class idCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            haveCard: false,
            card: {},
            ext: '',
            ext2: '',
            pageNumber: 1,
            numPages: null,
            user: {},


        };

    }

    static getInitialProps ({ query: { id } }) {
        return { user_id: id }

    }
    componentDidMount() {
        localStorage.setItem('path',Router.pathname);
        const id = this.props.user_id;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`/myAlfred/api/admin/users/users/${id}`)
            .then(response => {

                let user = response.data;
                this.setState({user: user});
                if(user.id_card !== undefined) {
                    this.setState({haveCard: true, card: user.id_card});
                    if(user.id_card.recto !== undefined){
                        const ext = user.id_card.recto.split('.').pop();
                        this.setState({ext:ext});
                    }
                    if(user.id_card.verso !== undefined){
                        const extVerso = user.id_card.verso.split('.').pop();
                        this.setState({ext2:extVerso});
                    }
                }


            })
            .catch(err => {
                console.log(err);
                if(err.response.status === 401 || err.response.status === 403) {
                    localStorage.removeItem('token');
                    Router.push({pathname: '/login'})
                }
            })

    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    validateCard() {
        const id = this.props.user_id;
        axios.put('/myAlfred/api/admin/users/users/idCard/'+id)
            .then(() => {
                alert('Carte d\'identité validée');
                Router.push({pathname: '/dashboard/users/all'})
            })
            .catch(err => console.log(err));
    }

    deleteCard() {
        const id = this.props.user_id;
        axios.put('/myAlfred/api/admin/users/users/idCard/delete/'+id)
            .then(() => {
                alert('Validation supprimée');
                Router.push({pathname: '/dashboard/users/all'})
            })
            .catch(err => console.log(err));
    }




    render()  {
        const { classes } = this.props;
        const {user} = this.state;
        const {haveCard} = this.state;
        const {ext} = this.state;
        const {ext2} = this.state;
        const {card} = this.state;




        return (
            <Layout>
                <Grid container className={classes.loginContainer}>
                    <Card className={classes.card}>
                        <Grid>
                            <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography style={{ fontSize: 30 }}>{user.name} {user.firstname}</Typography>
                            </Grid>
                            <Grid container style={{marginTop:20}}>
                                <img src={`../../${user.picture}`} alt={'picture'} width={100} style={{borderRadius:'50%'}}/>
                            </Grid>
                            {haveCard ?
                                <>
                                    <Grid container style={{marginTop:30}}>
                                        <Grid item xs={12}>

                                            {ext ==='pdf' ?
                                                <Document
                                                    file={`../../${card.recto}`}
                                                    onLoadSuccess={this.onDocumentLoadSuccess}
                                                >
                                                    <Page pageNumber={this.state.pageNumber} width={300} />
                                                </Document>
                                                :
                                                <img src={`../../${card.recto}`} alt={'recto'} width={300}/>

                                            }
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{marginTop:30}}>
                                        <Grid item xs={12}>

                                            {ext2 ==='pdf' ?
                                                <Document
                                                    file={`../../${card.verso}`}
                                                    onLoadSuccess={this.onDocumentLoadSuccess}
                                                >
                                                    <Page pageNumber={this.state.pageNumber} width={300} />
                                                </Document>
                                                :
                                                <img src={`../../${card.verso}`} alt={'recto'} width={300}/>

                                            }
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {user.id_confirmed ?
                                            <Button onClick={()=>this.deleteCard()} variant={"contained"} color={"secondary"} style={{color:"white"}}>Supprimer la confirmation</Button>
                                            :
                                            <Button onClick={()=>this.validateCard()} variant={"contained"} color={"primary"} style={{color:"white"}}>Valider la carte d'ientité</Button>
                                        }

                                    </Grid>
                                </>


                                :

                                <p>Aucune carte d'identité ou passeport</p>


                            }


                        </Grid>
                    </Card>
                </Grid>
            </Layout>
        );
    };
}



export default withStyles(styles)(idCard);
