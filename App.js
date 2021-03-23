import React, { useState } from "react";
import { ThemeProvider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import theme from './misc/theme.js';
import firebase from "./firebase/firebase.js";
import { Signup, Login, Profile } from './routes';

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
          <Drawer.Navigator initialRouteName="Signup">
            <Drawer.Screen
              name="Authenticate"
              options={{
                title: userEmail ? "Profile" : "Login",
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
      </ThemeProvider>
    );
  }
};

export default App;
