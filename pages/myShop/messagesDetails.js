import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';

class MessagesDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hello: '',
      message: '',
      messages: [],
      roomData: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.chatroomId;

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.get(`http://localhost:3122/myAlfred/api/chatRooms/userChatRoom/${id}`)
      .then(res => {
        this.setState({ roomData: res.data })
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', socket => {
          console.log(this.state.roomData.name);
          this.socket.emit('room', this.state.roomData.name)
        });
        this.socket.on('message', function(data) {
          console.log('Incoming message:', data);
        });
        this.socket.on('test', (data) => {
          const messages = [...this.state.messages];
          messages.push(data);
          this.setState({ messages });
        })
      })
      .catch(err => console.log(err))
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {
      event.preventDefault();
      this.socket.emit('envoitest', this.state.message);
      this.setState({message: ''});
  }

  static getInitialProps({ query: id }) {
    return { chatroomId: id.id}
  }

  render() {
    return (
      <div>
          <div>
              {this.state.messages.map((message, index) => {
                  return <div key={index}>{message}</div>
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