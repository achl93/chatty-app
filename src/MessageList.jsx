import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {  
  render() {
    // let newMsgProp = [];
    // const msgProp = this.props.messages.forEach((each) => {
    //   if (each.type === 'incomingMessage') {
    //     newMsgProp.push(each);
    //   }
    // });
    // let newServerProp = [];
    // const serverProp = this.props.systemMessages.forEach((each) => {
    //   if (each.type === 'postNotification') {
    //     newServerProp.push(each);
    //   }
    // });
    // console.log(msgProp);
    // console.log(serverProp);
    // if (newMsgProp) {
      const message = this.props.messages.map(msg => {
        if (msg.type === 'incomingMessage') {
          return <div key={ msg.id } className="message">
          <span className="message-username">{ msg.username }</span>
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
    // }
    // if (newServerProp) {
    //   var systemMessage = newServerProp.map(sysMsg => {
    //     return <main className="messages">
    //       <div key={ sysMsg.id } className="systemMessage">
    //         <span className="system-name">{ sysMsg.username }</span>
    //         <span className="system-content">{ sysMsg.content }</span>
    //       </div>
    //     </main>
    //   })
    // }
    return (
      <main className="messages">
        <Message indivMsg={ message }/>
      </main>
    );
  }
}
export default MessageList;