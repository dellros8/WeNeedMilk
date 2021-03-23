import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import firebase from "../../firebase/firebase.js";
import { Button, Input, Text, Icon } from "react-native-elements";
import PageContainer from "../../components/PageContainer/PageContainer.js";

const styles = StyleSheet.create({});

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, confirmPassword)
      .then(() => {
        navigation.navigate("Authenticate");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Sign up">
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
      <Input
        leftIcon={<Icon name="lock" type="font-awesome" size={24} color="black" iconStyle={{ marginRight: 8 }} />}
        placeholder="Confirm Password"
        secureTextEntry={true}
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <Button title="Sign up" onPress={() => signUp()}></Button>
    </PageContainer>
  );
};

export default Signup;
