import React from 'react';
import { connect } from 'react-redux';
import {setCurrentUserID, addMessage, addHistory} from '../actions';
import ChatInput from '../components/ChatInput';
import ChatHistory from '../components/ChatHistory';

function mapStateToProps(state) {
  return {
    history: state.app.get('messages').toJS(),
    userID: state.app.get('userID'),
    lastMessageTimestamp: state.app.get('lastMessageTimestamp'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage: (message) => dispatch(addMessage(message)),
    setUserID: (userID) => dispatch(setCurrentUserID(userID)),
    addHistory: (messages, timestamp) => dispatch(addHistory(messages, timestamp)),
  };
}

class App extends React.Component {
  static propTypes = {
    history: React.PropTypes.array,
    userID: React.PropTypes.number,
    addMessage: React.PropTypes.func,
    setUserID: React.PropTypes.func,
    addHistory: React.PropTypes.func,
    lastMessageTimestamp: React.PropTypes.string,
  };

  componentDidMount() {
    const ID = Math.round(Math.random() * 1000000);
    this.props.setUserID(ID);
    this.PubNub = PUBNUB.init({
      publish_key: 'pub-c-912f7a52-dcae-4f17-ac62-66bce4ef29e2',
      subscribe_key: 'sub-c-24dd7414-119d-11e8-92ea-7a3d09c63f1f',
      ssl: (location.protocol.toLowerCase() === 'https:'),
    });
    this.PubNub.subscribe({
      channel: 'ReactChat',
      message: this.props.addMessage,
    });
  }

  render() {
    const {props, sendMessage} = this;
    return (
      <div>
        <ChatHistory history={props.history} />
        <ChatInput userID={props.userID} sendMessage={sendMessage} />
      </div>
    );
  }

  fetchHistory = () => {
    const {props} = this;
    this.PubNub.history({
      channel: 'ReactChat',
      count: 15,
      start: props.lastMessageTimestamp,
      callback: (data) => {
        props.addHistory(data[0], data[1]);
      },
    });
  }

  sendMessage = (message) => {
    this.PubNub.publish({
      channel: 'ReactChat',
      message: message,
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
