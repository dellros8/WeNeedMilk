import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";

import firebase from "../../firebase/firebase.js";
import { PageContainer } from "../../components";

const Profile = ({ navigation, userEmail }) => {
  const [signingOut, setSigningOut] = useState(false);

  const signOut = () => {
    setSigningOut(true);
    firebase
      .auth()
      .signOut()
      .then(() => setSigningOut(false));
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title={userEmail}>
      <Button
        loading={signingOut}
        icon={<Icon name="sign-out" type="font-awesome" size={26} />}
        title="Log out"
        onPress={() => signOut()}
      ></Button>
    </PageContainer>
  );
};

export default Profile;
