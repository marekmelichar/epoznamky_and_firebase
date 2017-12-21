// import axios from "axios";
import * as firebase from 'firebase';

// export const FETCH_POSTS = "FETCH_POSTS";
// export const FETCH_POST = "FETCH_POST";
// export const CREATE_POST = "CREATE_POST";
// export const DELETE_POST = "DELETE_POST";
// export const TEST_AUTH = "TEST_AUTH";
// export const AUTH = "AUTH";

export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
export const SIGNUP_USER_FAIL = "SIGNUP_USER_FAIL";

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";

export const FETCH_NOTES_SUCCESS = "FETCH_NOTES_SUCCESS";

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";





export const signUpUser = ({ email, password }) => {

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
        dispatch(addNotification(error.message, 'error')) // success, error, warning, info
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









// const ROOT_URL = "https://api.marekmelichar.cz";
// const ROOT_URL = "http://localhost:8888";

// export function fetchPosts() {
//   const request = axios.get(`${ROOT_URL}/wp-json/wp/v2/posts`);
//
//   return {
//     type: FETCH_POSTS,
//     payload: request
//   };
// }

// export function createPost(values, callback) {
//   // console.log('values', values);
//
//   const request = axios.post(`${ROOT_URL}/wp-json/wp/v2/posts`, values)
//
//   return {
//     type: CREATE_POST,
//     payload: request
//   };
// }

// export function fetchPost(id) {
//   const request = axios.get(`${ROOT_URL}/wp-json/wp/v2/posts/${id}`);
//
//   return {
//     type: FETCH_POST,
//     payload: request
//   };
// }

// export function deletePost(id, callback) {
//   const request = axios
//     // .delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
//     .then(() => callback());
//
//   return {
//     type: TEST_AUTH,
//     payload: id
//   };
// }
//
// export function testAUTH() {
//   const request = axios.get(`${ROOT_URL}/wp-json/`)
//
//   return {
//     type: TEST_AUTH,
//     payload: request
//   };
// }
