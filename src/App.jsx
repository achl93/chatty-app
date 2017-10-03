import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 2,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
    this.onSendMessage = this.onSendMessage.bind(this);
  }

  onSendMessage(content) {
    const msg = {
      id: Math.random() * 99 + 1,
      username: this.state.currentUser.name,
      content: content
    }
    this.setState({
      messages: this.state.messages.concat(msg)
    })
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
    this.wsConnection = new WebSocket('ws://localhost:3001');
    console.log("Connected to server");
  }

  render() {
    return (
      <div>
        <ChatBar onSendMessage={ this.onSendMessage } currentUser={ this.state.currentUser.name }/>
        <MessageList messages={ this.state.messages }/>
      </div>
    );
  }
}
export default App;
