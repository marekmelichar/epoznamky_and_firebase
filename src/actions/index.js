// import axios from "axios";
import * as firebase from 'firebase';

export const FETCH_POSTS = "FETCH_POSTS";
// export const FETCH_POST = "FETCH_POST";
// export const CREATE_POST = "CREATE_POST";
// export const DELETE_POST = "DELETE_POST";
// export const TEST_AUTH = "TEST_AUTH";
export const AUTH = "AUTH";
export const FETCH_NOTES_SUCCESS = "FETCH_NOTES_SUCCESS";

export const auth = a => {
  return {
    type: AUTH,
    payload: a
  };
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
