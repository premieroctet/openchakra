import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import Footer from '../../hoc/Layout/Footer/Footer';
import { toast } from 'react-toastify';
import axios from 'axios';






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
    },
    bottombar:{visibility:'hidden', [theme.breakpoints.down('sm')]: {
            visibility:'visible',
            boxShadow: '2px -5px 14px -15px rgba(0,0,0,0.75)'
        }},
    topbar:{visibility:'visible', position: 'sticky', top: 65, zIndex:999,[theme.breakpoints.down('sm')]: {
            visibility:'hidden',
        }},



});

class Messages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            idEmitter: '',
            idRecipient: '',
            chatrooms: []
        }
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get('http://localhost:3122/myAlfred/api/users/current')
            .then(res => {
                console.log(res.data);
                this.setState({ idEmitter: res.data._id })
            })
        axios.get('http://localhost:3122/myAlfred/api/users/users/5d8c82176b3b73c9e4c467b8')
            .then(res => {
                console.log(res.data);
                this.setState({ idRecipient: res.data._id });
            })

        axios.get('http://localhost:3122/myAlfred/api/chatRooms/userChatRooms')
            .then(res => {
                this.setState({ chatrooms: res.data })
            })
    }

    createChat() {
        axios.post('http://localhost:3122/myAlfred/api/chatRooms/addAndConnect', { emitter: this.state.idEmitter, recipient: this.state.idRecipient })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        const {classes} = this.props;


        return(
            <>
            <div>
                {this.state.chatrooms.length ?
                    this.state.chatrooms.map(chatroom => {
                        return (
                            <Link href={`/myShop/messagesDetails?id=${chatroom._id}`}>
                                <div>
                                    <p>Conversation entre vous et {chatroom.attendees[1].firstname}</p>
                                    <p>{chatroom.name}</p>
                                </div>
                            </Link>
                        )
                    })
                    :
                    null
                }
            </div>
            <button type="button" onClick={() => this.createChat()}>Créer un chat</button>
            </>
        )
    };
}



export default withStyles(styles)(Messages);
