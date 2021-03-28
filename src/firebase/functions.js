import { firebaseDB, firebaseAuth } from './config.js';

export const getList = (listCode) => {
  return firebaseDB.ref(`shoppinglists/${listCode}`).once('value');
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

export const pushItemToList = (listCode, itemObj) => {
  return firebaseDB.ref(`shoppinglists/${listCode}/items`).push(itemObj);
};

export const updateItemInList = (listCode, itemId, updateObj) => {
  return firebaseDB.ref(`shoppinglists/${listCode}/items/${itemId}`).update(updateObj);
};

export const removeItemFromList = (listCode, itemId) => {
  return firebaseDB.ref(`shoppinglists/${listCode}/items/${itemId}`).remove();
};
