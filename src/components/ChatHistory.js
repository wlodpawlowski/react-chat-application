import * as React from 'react';

class ChatHistory extends React.Component {
  static propTypes = {
    history: React.PropTypes.array,
  };
  render() {
    const {props} = this;
    return (
        <ul className="collection">
            {props.history.map((messageObj) => {
              const imgURL = '//robohash.org/' + messageObj.Who + '?set=set2&bgset=bg2&size=70x70';
              const messageDate = new Date(messageObj.When);
              const messageDateTime = messageDate.toLocaleDateString() + ' at ' + messageDate.toLocaleTimeString();
              return (
                    <li className="collection-item avatar" key={messageObj.When}>
                        <img src={imgURL} alt={messageObj.Who} className="circle"/>
                        <span className="title">Chat bot #{messageObj.Who}</span>
                        <p>
                            <i className="prefix mdi-action-alarm" />
                            <span className="message-date">{messageDateTime}</span>
                            <br/>
                            <p className="message-content">{messageObj.What}</p>
                        </p>
                    </li>
                );
            })}
        </ul>
    );
  }
}

export default ChatHistory;
