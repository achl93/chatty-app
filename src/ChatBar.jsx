import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      messageContent: ''
    }
  }
  render() {
    const onEnter = (event) => {
      if (event.which === 13 || event.keyCode === 13) {
        this.props.onSendMessage(event.target.value);
        event.target.value = '';
        this.setState({
          currentUser: this.state.currentUser,
          messageContent: ''
        })
      }
    }
    const onNewName = (event) => {
      if (event.which === 13 || event.keyCode === 13) {
        this.setState({
          currentUser: event.target.value
        })
        this.props.onChangeName(event.target.value);
        // console.log(JSON.stringify(event.target.value));
        // this.props.onChangeName(event.target.value);
      }
    }
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={ this.props.currentUser } onKeyPress={ onNewName }/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={ onEnter }/>
      </footer>
    );
  }
}
export default ChatBar;