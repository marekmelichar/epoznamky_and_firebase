// import axios from "axios";
import * as firebase from 'firebase';


export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
export const SIGNUP_USER_FAIL = "SIGNUP_USER_FAIL";

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";

export const FETCH_NOTES_SUCCESS = "FETCH_NOTES_SUCCESS";

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";

export const NOTE_DELETE = "NOTE_DELETE"





export const signUpUser = ({ email, password }) => {
// console.log(email, password);
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({
          type: SIGNUP_USER_SUCCESS,
          payload: user
        })
      })
      .catch(error => {
        dispatch({
          type: SIGNUP_USER_FAIL,
          payload: error
        })
        dispatch(addNotification(error.message, 'error'))
      })
  }
}

export const loginUser = ({ email, password }) => {

  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: user
        })
      })
      .catch(error => {
        dispatch({
          type: LOGIN_USER_FAIL,
          payload: error
        })
        dispatch(addNotification(error.message, 'error'))
      })
  }
}

export const logOut = () => {

  return (dispatch) => {
    firebase.auth().signOut()
  }
}

export const createNote = ({title, content, tags}) => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/notes`)
      .push({ title, content, tags })
      .then(() => {
        dispatch(addNotification(`note: "${title}" has been successfully created`, 'success'))
      })
  }
}

export const fetchNotes = () => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/notes`)
      .on('value', snapshot => {
        dispatch({
          type: FETCH_NOTES_SUCCESS,
          payload: snapshot.val()
        })
      })
  }
}

export const addNotification = (message, level) => {
  return {
    type: ADD_NOTIFICATION,
    message,
    level
  };
}

export const noteDelete = (uid, title) => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/notes/${uid}`)
      .remove()
      .then(() => {
        dispatch(addNotification(`note: "${title}" has been deleted`, 'success'))
      })
  }
}

export const noteUpdate = (uid, title, content, tags) => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/notes/${uid}`)
      .update({
        title,
        content,
        tags
      })
      .then(() => {
        dispatch(addNotification(`note: "${title}" has been updated`, 'success'))
      })
  }
}
