import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import firebase from "./firebase/firebase.js";
import Dropdown from "./components/Dropdown/Dropdown.js";
import Navbar from "./components/Navbar/Navbar.js";
import Signup from "./routes/Signup/Signup.js";
import Login from "./routes/Login/Login.js";
import Profile from "./routes/Profile/Profile.js";

const Drawer = createDrawerNavigator();

const App = () => {
  const [userEmail, setUserEmail] = useState("initial");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUserEmail(user.email);
    } else {
      setUserEmail("");
    }
  });

  if (userEmail === "initial") {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Signup">
          <Drawer.Screen
            name="Authenticate"
            options={{
              title: userEmail || "Login",
            }}
          >
            {(props) => (userEmail ? <Profile {...props} userEmail={userEmail} /> : <Login {...props} />)}
          </Drawer.Screen>
          {!userEmail && <Drawer.Screen name="Signup" component={Signup} />}
          {/* <Stack.Screen name="AddShoppingList" component={AddShoppingListRoute} />
          <Stack.Screen name="CreateShoppingList" component={CreateShoppingListRoute} />
        <Stack.Screen name="ShoppingList" component={ShoppingListRoute} /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
