import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div>
        { this.props.indivMsg }
      </div>
    );
  }
}
export default Message;