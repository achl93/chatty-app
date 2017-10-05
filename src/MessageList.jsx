import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {  
  render() {
    // Color assigner when user connects
    const colorArr = ['null', 'black', 'blue', 'hotpink', 'yellow'];
    const message = this.props.messages.map(msg => {
      if (msg.type === 'incomingMessage') {
        const spanStyle = {
          color: colorArr[msg.color]
        }
        return <div key={ msg.id } className="message">
        <span style={ spanStyle } className="message-username">{ msg.username }</span>
        <span className="message-content">{ msg.content }</span>
        </div>
      }
      else {
        return <div key={ msg.id } className="server-message">
        <span className="server-name">{ msg.username }</span>
        <span className="server-content">{ msg.content }</span>
        </div>
      }
    })
    return (
      <main className="messages">
        <Message indivMsg={ message }/>
      </main>
    );
  }
}
export default MessageList;