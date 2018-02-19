import {ADD_MESSAGE, SET_CURRENT_USERID, ADD_HISTORY} from '../constants';

export function setCurrentUserID(userID) {
  return {
    type: SET_CURRENT_USERID,
    payload: userID,
  };
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: message,
  };
}

export function addHistory(messages, timestamp) {
  return {
    type: ADD_HISTORY,
    payload: {
      messages,
      timestamp,
    },
  };
}

