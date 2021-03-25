import React, { useEffect, useState } from 'react';
import { ThemeProvider, Text } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import theme from './misc/theme.js';
import { firebaseAuth } from './firebase/firebase.js';
import { Signup, Login, Profile, SharedList, CreateList, AddList, QuickList } from './routes';
import { DrawerContent } from './components';

const Drawer = createDrawerNavigator();

const App = () => {
  const [userId, setUserId] = useState('initial');
  const [userEmail, setUserEmail] = useState('');

  firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      setUserEmail(user.email);
      setUserId(user.uid);
    } else {
      setUserEmail('');
      setUserId('');
    }
  });

  if (userId === 'initial') {
    return null;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="quicklist"
            drawerContent={(props) => <DrawerContent userId={userId} userEmail={userEmail} {...props} />}>
            <Drawer.Screen name="authenticate">
              {(props) => (userEmail ? <Profile userEmail={userEmail} {...props} /> : <Login {...props} />)}
            </Drawer.Screen>
            <Drawer.Screen name="signup" component={Signup} />
            <Drawer.Screen name="quicklist">{(props) => <QuickList {...props} />}</Drawer.Screen>
            <Drawer.Screen name="createlist">{(props) => <CreateList userId={userId} {...props} />}</Drawer.Screen>
            <Drawer.Screen name="addlist">{(props) => <AddList userId={userId} {...props} />}</Drawer.Screen>
            <Drawer.Screen name="sharedlist">
              {(props) => (
                <SharedList
                  shoppingListTitle={props.route.params.shoppingListTitle}
                  sharedListCode={props.route.params.sharedListCode}
                  {...props}
                />
              )}
            </Drawer.Screen>
          </Drawer.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    );
  }
};

export default App;
