import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const onEnter = (event) => {
      if (event.which === 13 || event.keyCode === 13) {
        this.props.onSendMessage(event.target.value);
        event.target.value = '';
      }
    }
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={ this.props.currentUser }/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={ onEnter }/>
      </footer>
    );
  }
}
export default ChatBar;