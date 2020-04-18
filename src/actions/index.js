import * as actionTypes from './types';

// add user object to the store
export const setUser = user => {
   return {
      type: actionTypes.SET_USER,
      payload: {
         currentUser: user
      }
   }
} 

// clear user object from the store
export const clearUser = () => {
   return {
      type: actionTypes.CLEAR_USER
   }
}