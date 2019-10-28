import React, {Fragment} from 'react';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const { config } = require('../config/config');
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

class MyReservations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            idEmitter: '',
            idRecipient: '',
            chatroomsAlfred: [],
            chatroomsUser: [],
            showAlfredMessages: 1,
            showUserMessages: 0
        }
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get('http://localhost:3122/myAlfred/api/users/current')
            .then(res => {
                this.setState({ idEmitter: res.data._id })

                axios.get('http://localhost:3122/myAlfred/api/chatRooms/userChatRooms')
                    .then(res => {
                        res.data.map(chatroom => {
                            console.log(chatroom);
                            if (this.state.idEmitter === chatroom.emitter._id) {
                                const alfredArr = this.state.chatroomsAlfred.concat(chatroom);
                                this.setState({ chatroomsAlfred: alfredArr });
                            } else {
                                const userArr = this.state.chatroomsUser.concat(chatroom);
                                this.setState({ chatroomsUser: userArr });
                            }
                        })
                    })
            })
        axios.get('http://localhost:3122/myAlfred/api/users/users/5d8c82176b3b73c9e4c467b8')
            .then(res => {
                this.setState({ idRecipient: res.data._id });
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

    createChatUser() {
        axios.post('http://localhost:3122/myAlfred/api/chatRooms/addAndConnect', { emitter: this.state.idRecipient, recipient: this.state.idEmitter })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    getAlfredMessages() {
        this.setState({
            showAlfredMessages: 1,
            showUserMessages: 0
        })
    }

    getUserMessages() {
        this.setState({
            showAlfredMessages: 0,
            showUserMessages: 1
        })
    }

    render() {
        const {classes} = this.props;


        return(
            <>
            <button onClick={() => this.getAlfredMessages()}>Mes réservations en tant qu'Alfred</button>
            <button onClick={() => this.getUserMessages()}>Mes réservations en tant qu'utilisateur</button>
            <div>
                {this.state.showAlfredMessages === 1 ?
                    this.state.chatroomsAlfred.length ?
                        this.state.chatroomsAlfred.map((chatroom, index) => {
                            return (
                                <Link key={index} href={`/myShop/messagesDetails?id=${chatroom._id}`}>
                                    <div>
                                        <p>Alfred Conversation entre vous et {chatroom.recipient.firstname}</p>
                                        <p>{chatroom.name}</p>
                                    </div>
                                </Link>
                            )
                        })
                        :
                        null
                    :
                    null
                }
                {this.state.showUserMessages === 1 ?
                    this.state.chatroomsUser.length ?
                        this.state.chatroomsUser.map((chatroom, index) => {
                            return (
                                <Link key={index} href={`/myShop/messagesDetails?id=${chatroom._id}`}>
                                    <div>
                                        <p>User Conversation entre vous et {chatroom.recipient.firstname}</p>
                                        <p>{chatroom.name}</p>
                                    </div>
                                </Link>
                            )
                        })
                        :
                        null
                    :
                    null
                }
            </div>
            <button type="button" onClick={() => this.createChat()}>Créer un chat Alfred</button>
            <button type="button" onClick={() => this.createChatUser()}>Créer un chat User</button>
            </>
        )
    };
}



export default withStyles(styles)(MyReservations);