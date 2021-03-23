import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import firebase from "../../firebase/firebase.js";
import { Button, Input, Text, Icon } from "react-native-elements";
import Navbar from "../../components/Navbar/Navbar.js";
import PageContainer from '../../components/PageContainer/PageContainer.js';

const styles = StyleSheet.create({
  
});

const Profile = ({ navigation, userEmail }) => {
  const [error, setError] = useState("");

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then((response) => {
        console.log(response);
        navigation.navigate("Authenticate");
      })
      .catch((error) => {
        setError(error.message);
        let errorCode = error.code;
        // ..
      });
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title={userEmail}>
      <Button title="Log out" onPress={() => signOut()}></Button>
    </PageContainer>
  );
};

export default Profile;
