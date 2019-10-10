import React from 'react';
import io from 'socket.io-client';

class MessagesDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hello: '',
      message: '',
      messages: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('chat message', msg => {
        let messages = [...this.state.messages];
        messages.push(msg);
        this.setState({ messages });
    });
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {
      event.preventDefault();
      this.socket.emit('chat message', this.state.message);
      this.setState({message: ''});
  }

  render() {
    return (
      <div>
          <ul>
              {this.state.messages.map((message, index) => {
                  return <li key={index}>{message}</li>
              })}
          </ul>
          <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.message} onChange={this.handleChange} />
          </form>
      </div>
    )
  }
}