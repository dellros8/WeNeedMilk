import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements";

import firebase from "../../firebase/firebase.js";
import { PageContainer } from '../../components';

const styles = StyleSheet.create({
  logInButton: {
    width: "100%",
  },
});

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Log in">
      <Input
        leftIcon={<Icon name="envelope" type="font-awesome" size={18} color="black" iconStyle={{ marginRight: 8 }} />}
        placeholder="Email Address"
        label="Email Address"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        leftIcon={<Icon name="lock" type="font-awesome" size={24} color="black" iconStyle={{ marginRight: 8 }} />}
        placeholder="Password"
        secureTextEntry={true}
        label="Password"
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <Button style={styles.logInButton} title="Log in" onPress={() => login()} />
    </PageContainer>
  );
};

export default Login;
