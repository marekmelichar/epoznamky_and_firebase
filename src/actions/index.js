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
        firebase.database().ref('/users').push({ user: user.uid }).then(() => {
          dispatch({
            type: SIGNUP_USER_SUCCESS,
            payload: user
          })
        })

        // dispatch({
        //   type: SIGNUP_USER_SUCCESS,
        //   payload: user
        // })
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

export const createNote = ({_id, title, content, tags, sharedWith, ownerId}) => {
  // const { currentUser } = firebase.auth()

  // const _id = makeID()
  const createdAt = Date.now()

  return (dispatch) => {
    firebase.database().ref('/notes')
      .push({
        _id,
        title,
        content,
        tags,
        sharedWith,
        createdAt,
        ownerId,
      })
      .then(() => {
        dispatch(addNotification(`note: "${title}" has been successfully created`, 'success'))
      })
  }
}

export const fetchNotes = () => {
  // const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref('/notes')
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
  // const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`notes/${uid}`)
      .remove()
      .then(() => {
        dispatch(addNotification(`note: "${title}" has been deleted`, 'success'))
      })
  }
}

export const noteUpdate = (uid, title, content, tags, sharedWith) => {
  // const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`notes/${uid}`)
      .update({
        title,
        content,
        tags,
        sharedWith
      })
      .then(() => {
        dispatch(addNotification(`note: "${title}" has been updated`, 'success'))
      })
  }
}





// root_of_Firebase: {
//   contacts: {
//     {
//       "_id": "DjuyqB6s7vc7FvsNT",
//       "name": "test",
//       "surname": "test",
//       "email": "test@test.com",
//       "phone": "123123123"
//     }
//   },
//
//   users: {
//     {
//         "_id": "iKhydZbTuKQQe75jc",
//         "createdAt": {
//             "$date": "2016-12-26T17:28:20.618Z"
//         },
//         "emails": [
//             {
//                 "address": "ja.melicharova@gmail.com",
//                 "verified": false
//             }
//         ]
//     },
//     {
//     "_id": "j3JBafG8r9X6g6qm4",
//     "createdAt": {
//         "$date": "2016-12-26T17:25:27.152Z"
//     },
//     "emails": [
//         {
//             "address": "marek.melichar@icloud.com",
//             "verified": false
//         }
//     ]
// }
//   },
//
//   notes: {
//     {
//         "_id": "X5hdGo8msEzoiEtAx",
//         "createdAt": {
//             "$date": "2017-02-19T20:00:10.531Z"
//         },
//         "title": "Danove priznani",
//         "content": "vypis z uctu,\nsocka, zdravka moje + Jana,\ncestne prohlaseni Jana,\nzivotni pojistka moje + Jana,\nduchodovy pojisteni moje + Jana,\nfaktury 2016,\npotvrzeni o prijmech Pilot + Ixperta,\npotvrzeni ze skolky",
//         "sharedWith": [],
//         "ownerId": "j3JBafG8r9X6g6qm4",
//         "tags": [
//             "daně"
//         ]
//     }
//   },
//   {
//     "_id": "dwx4dpy6Q3TfsgQrJ",
//     "createdAt": {
//         "$date": "2017-02-25T11:37:07.455Z"
//     },
//     "title": "react konfigurovatelny slideshow",
//     "content": "uzivatel si nahraje obrazky a posklada si z toho slidy",
//     "sharedWith": [],
//     "ownerId": "j3JBafG8r9X6g6qm4",
//     "tags": [
//         "dev"
//     ]
// }
// }















// AUTH RULES:

// {
//   "rules": {
//     "users": {
//       "$uid": {
//         ".read": "auth != null && auth.uid == $uid",
//         ".write": "auth != null && auth.uid == $uid"
//       }
//     }
//   }
// }
//
// {
//   "rules": {
//     "users": {
//       "$uid": {
//         ".read": "$uid === auth.uid",
//         ".write": "$uid === auth.uid",
//         "notes": {
//           "$note": {
//             ".read": "$uid === auth.uid || root.child('users/'+$uid+'/notes/'+$note+'/sharedWith').hasChild(auth.id)",
//             ".write": "$uid === auth.uid || root.child('users/'+$uid+'/notes/'+$note+'/sharedWith').hasChild(auth.id)"
//           }
//         }
//       }
//     }
//   }
// }
