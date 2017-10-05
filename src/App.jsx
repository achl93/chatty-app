import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentUser: {name: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userSize: 0
    }
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
  }

  onSendMessage(content) {
    const msg = {
      username: this.state.currentUser ? this.state.currentUser.name : 'Anonymous',
      content: content
    }
    this.wsConnection.send(JSON.stringify(msg));
  }

  onChangeName(content) {
    const nameData = {
      currName: this.state.currentUser ? this.state.currentUser.name : 'Anonymous',
      newName: content,
      type: 'postNotification',
      username: 'Server'
    }
    this.setState({ currentUser: { name: content } });
    this.wsConnection.send(JSON.stringify(nameData));
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 1, username: "Michelle", content: "Hello there!", type: "incomingMessage", color: 1};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);

    this.wsConnection = new WebSocket('ws://localhost:3001');

    this.wsConnection.onopen = (event) => {
      console.log("Connected to websocket server");
    };

    this.wsConnection.onclose = () => {
      this.setState({
        userSize: this.state.userSize - 1
      })
    }

    this.wsConnection.onmessage = (event) => {
      console.log("Message received from server");
      const eventData = JSON.parse(event.data);
      if (typeof eventData === typeof 1 && !eventData.type) {
        this.setState({
          userSize: eventData
        })
      }
      if (eventData.type === 'incomingMessage') {
        this.setState({
          messages: this.state.messages.concat(eventData),
        })
        console.log(this.state.messages);
      } else if (eventData.type === 'postNotification') {
        // console.log(eventData);
        this.setState({
          messages: this.state.messages.concat(eventData)
        })
        // console.log(this.state.messages);
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div id='connectedCount'>Clients connected: { this.state.userSize }</div>
        </nav>
        <ChatBar onSendMessage={ this.onSendMessage } onChangeName={ this.onChangeName } currentUser={ this.state.currentUser ? this.state.currentUser.name : 'Anonymous' }/>
        <MessageList messages={ this.state.messages }/>
      </div>
    );
  }
}
export default App;
