import { firebaseDB, firebaseAuth } from './config.js';

export const signUp = (email, password) => {
  return firebaseAuth.createUserWithEmailAndPassword(email, password);
};

export const signOut = () => {
  return firebaseAuth.signOut();
};

export const signIn = (email, password) => {
  return firebaseAuth.signInWithEmailAndPassword(email, password);
};

export const getList = (listCode) => {
  return firebaseDB.ref(`shoppinglists/${listCode}`).once('value');
};

export const setUser = (userId, email) => {
  return firebaseDB.ref('users/' + userId).set({ userId, email });
};

export const setListToUser = (listCode, listName, userId) => {
  return firebaseDB.ref(`users/${userId}/myshoppinglists/${listCode}`).set({
    code: listCode,
    name: listName,
  });
};

export const setList = (listCode, listObj) => {
  return firebaseDB.ref(`shoppinglists/${listCode}`).set(listObj);
};

export const listItemsRef = (listCode) => {
  return firebaseDB.ref(`shoppinglists/${listCode}/items`);
};

export const myListsRef = (userId) => {
  return firebaseDB.ref(`users/${userId}/myshoppinglists`);
};

export const removeList = (listCode, userId) => {
  return firebaseDB.ref(`users/${userId}/myshoppinglists/${listCode}`).remove();
};

export const pushItemToList = (listCode, itemObj) => {
  return firebaseDB.ref(`shoppinglists/${listCode}/items`).push(itemObj);
};

export const updateItemInList = (listCode, itemId, updateObj) => {
  return firebaseDB.ref(`shoppinglists/${listCode}/items/${itemId}`).update(updateObj);
};

export const removeItemFromList = (listCode, itemId) => {
  return firebaseDB.ref(`shoppinglists/${listCode}/items/${itemId}`).remove();
};
