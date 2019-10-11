import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';

class MessagesDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: {},
      message: '',
      messages: [],
      oldMessagesDisplay: [],
      oldMessages: [],
      roomData: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.chatroomId;

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.get('http://localhost:3122/myAlfred/api/users/current')
      .then(res => {
        this.setState({ userData: res.data });
      })
    axios.get(`http://localhost:3122/myAlfred/api/chatRooms/userChatRoom/${id}`)
      .then(res => {
        this.setState({ 
          roomData: res.data,
          oldMessagesDisplay: res.data.messages,
          oldMessages: res.data.messages
        })
        console.log(this.state.oldMessages);
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', socket => {
          console.log(this.state.roomData.name);
          this.socket.emit('room', this.state.roomData.name)
        });
        this.socket.on('displayMessage', (data) => {
          const messages = [...this.state.messages];
          const oldMessages = [...this.state.oldMessages];
          oldMessages.push(data);
          messages.push(data);
          console.log(oldMessages);
          axios.put(`http://localhost:3122/myAlfred/api/chatRooms/saveMessages/${id}`, {messages: oldMessages})
            .then(res => console.log(res));
          this.setState({ 
            messages,
            oldMessages
          });
        })
      })
      .catch(err => console.log(err))
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {
      const messObj = { user: this.state.userData.firstname, content: this.state.message };
      console.log(messObj);
      event.preventDefault();
      this.socket.emit('message', messObj);
      this.setState({message: ''});
  }

  static getInitialProps({ query: id }) {
    return { chatroomId: id.id}
  }

  render() {
    return (
      <div>
          <div>
              {
                this.state.oldMessagesDisplay.map((oldMessage, index) => {
                  return (
                    <div key={index}>
                      <p>{oldMessage.user} :</p>
                      <p>{oldMessage.content}</p>
                    </div>
                  )
                })
              }
              {typeof this.state.roomData.messages !== 'undefined' ?
                <div>
                  <hr />
                  <p>Aujourd'hui</p>
                </div>
                : null
              }
              {this.state.messages.map((message, index) => {
                  return <div key={index}>
                    <p>{message.user} :</p>
                    <p>{message.content}</p>
                  </div>
              })}
          </div>
          <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.message} onChange={this.handleChange} />
          </form>
      </div>
    )
  }
}

export default MessagesDetails;