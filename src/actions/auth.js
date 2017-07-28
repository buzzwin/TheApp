import {firebaseApp} from '../database/firebase'

import { NavigationActions } from 'react-navigation';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SIGN_UP_REQUESTED = 'SIGN_UP_REQUESTED';
export const SIGN_UP_REJECTED = 'SIGN_UP_REJECTED';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';

export const LOGIN_DRAWER = 'LoginDrawer';
export const MAIN_DRAWER = 'MainDrawer';

export function loginRejected(error) {
    return {
        type: 'LOGIN_REJECTED',
        error
    };
}

export function loginRequested(bool) {
    return {
        type: 'LOGIN_REQUESTED',
        isLoading: bool
    };
}

export function loginSuccess(user) {
    return {
        type: 'LOGIN_SUCCESS',
        user
    };
}

export function login(email, password) {
  return (dispatch) => {
       dispatch(signUpRequested(true));
       firebaseApp.auth().signInWithEmailAndPassword(email, password)
       .then((user) => {
         var usernameListRef = firebaseApp.database().ref('users');
         //var usersRef = usernameListRef.child('users');
         var loggedInUserRef = usernameListRef.child(user.uid);
         var path = loggedInUserRef.toString();

         loggedInUserRef.once('value')
  .then(function(dataSnapshot) {
    //console.log(dataSnapshot.val());
     dispatch(loginSuccess(dataSnapshot.val()));
    // handle read data.
  });
// path is now 'https://sample-app.firebaseio.com/users/ada/name/first'
         //firebaseApp.database().ref(path)...once('value')
         //.then((snapshot) => {
         //console.log(snapshot);
         //})
       }).catch((error) => dispatch(loginRejected(error)));;;
   };
}

export function signUpRejected(error) {
    return {
        type: 'SIGN_UP_REJECTED',
        error
    };
}

export function signUpRequested(bool) {
    return {
        type: 'SIGN_UP_REQUESTED',
        isLoading: bool
    };
}

export function signUpSuccess(user) {
    return {
        type: 'SIGN_UP_SUCCESS',
        user
    };
}

export function signUp(email, password, name) {
var userProfile = {};

  return (dispatch) => {
       dispatch(signUpRequested(true));


                 firebaseApp.auth().createUserWithEmailAndPassword(email, password)
                 .then((user) => {
                   firebaseApp.database().ref('usernameList').child(name.toLowerCase()).set(user.uid)
                   user.updateProfile({displayName: name})
                   .then(() => {
                     const uid  = user.uid
                     const username =   user.displayName
                     const email = user.email
                     const post_count = 0
                     const chat_count = 0
                     const order_count = 0
                     firebaseApp.database().ref('users/' + user.uid)
                     .set({
                       uid,
                       username,
                       post_count,
                       chat_count,
                       order_count,
                       email,
                     })
                     user.post_count = post_count;
                     user.chat_count = chat_count;
                     user.order_count = order_count
                     dispatch(signUpSuccess(user));
                     return user;
               })
             }).catch((error) => dispatch(signUpRejected(error)));;

   };

}

export function checkLogin() {
    return (dispatch) => {
        firebaseApp.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("user ", user);
                dispatch(loginSuccess(user));
            }
            else {
                console.log("user not signed in");
                dispatch({type: LOGIN_DRAWER});
            }
        });
    };
}

export function signOut() {
    return (dispatch) => {
        firebaseApp.auth().signOut()
            .then(function() {
                console.log('Signed Out');
            })
            .catch(function(error) {
                console.error('Sign Out Error', error);
            });
    }
}

export function resetNav(routeName) {
    return (dispatch) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: routeName })
            ]
        });
        dispatch(resetAction);
    }
}