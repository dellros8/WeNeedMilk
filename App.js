import React, { useState } from "react";
import { ThemeProvider, Text } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import theme from "./misc/theme.js";
import firebase from "./firebase/firebase.js";
import { Signup, Login, Profile, ShoppingList } from "./routes";
import { DrawerContent } from './components';

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
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Signup" drawerContent={(props) => <DrawerContent userEmail={userEmail} {...props} />}>
            <Drawer.Screen name="authenticate">
              {(props) => (userEmail ? <Profile {...props} userEmail={userEmail} /> : <Login {...props} />)}
            </Drawer.Screen>
            <Drawer.Screen name="signup" component={Signup} />
            <Drawer.Screen name="shoppinglist" component={ShoppingList} />
          </Drawer.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    );
  }
};

export default App;
