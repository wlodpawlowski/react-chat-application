import React from 'react';
import { connect } from 'react-redux';
import ChatInput from '../components/ChatInput';
import ChatHistory from '../components/ChatHistory';

function mapStateToProps(/* state */) {
  return {
    // TODO: Add state to be mapped to props
  };
}

function mapDispatchToProps(/* dispatch */) {
  return {
    // TODO: Add actions to be mapped to props
  };
}

class App extends React.Component {
  state = {
    userID: Math.round(Math.random() * 1000000).toString(),
    history: [],
  };

  componentDidMount() {
    this.PubNub = PUBNUB.init({
      publish_key: 'pub-c-912f7a52-dcae-4f17-ac62-66bce4ef29e2',
      subscribe_key: 'sub-c-24dd7414-119d-11e8-92ea-7a3d09c63f1f',
      ssl: (location.protocol.toLowerCase() === 'https:'),
    });
    this.PubNub.subscribe({
      channel: 'ReactChat',
      message: function doSomething(message) {
      },
    });
  }

  render() {
    const {sendMessage, state} = this;
    return (
      <div>
        <ChatHistory history = {state.history} />
        <ChatInput userID = {state.userID} sendMessage = {sendMessage} />
      </div>
    );
  }

  sendMessage = (message) => {
    console.log('sendMessage', message);
    this.PubNub.publish({
      channel: 'ReactChat',
      message: 'Hello World!',
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
