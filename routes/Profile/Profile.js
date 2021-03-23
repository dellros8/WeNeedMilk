import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import firebase from "../../firebase/firebase.js";
import { PageContainer } from '../../components';

const styles = StyleSheet.create({});

const Profile = ({ navigation, userEmail }) => {

  const [error, setError] = useState("");

  const signOut = () => {
    firebase
      .auth()
      .signOut()
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title={userEmail}>
      <Button title="Log out" onPress={() => signOut()}></Button>
    </PageContainer>
  );
};

export default Profile;
