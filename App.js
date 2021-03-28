import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { firebaseAuth } from './src/firebase/config.js';
import { Signup, Login, Profile, SharedList, CreateList, AddList, PersonalList } from './src/routes';
import { DrawerContent } from './src/components';

const Drawer = createDrawerNavigator();

const App = () => {
  const [userId, setUserId] = useState('initial');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(setUser);
  }, []);

  const setUser = (user) => {
    if (user) {
      setUserEmail(user.email);
      setUserId(user.uid);
    } else {
      setUserEmail('');
      setUserId('');
    }
  };

  if (userId === 'initial') {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="personallist"
          drawerContent={(props) => <DrawerContent userId={userId} {...props} />}>
          <Drawer.Screen name="authenticate">
            {(props) => (userEmail ? <Profile userEmail={userEmail} {...props} /> : <Login {...props} />)}
          </Drawer.Screen>
          <Drawer.Screen name="signup" component={Signup} />
          <Drawer.Screen name="personallist">{(props) => <PersonalList {...props} />}</Drawer.Screen>
          <Drawer.Screen name="createlist">{(props) => <CreateList userId={userId} {...props} />}</Drawer.Screen>
          <Drawer.Screen name="addlist">{(props) => <AddList userId={userId} {...props} />}</Drawer.Screen>
          <Drawer.Screen name="sharedlist">
            {(props) => (
              <SharedList
                shoppingListTitle={props.route.params.shoppingListTitle}
                sharedListCode={props.route.params.sharedListCode}
                userId={props.route.params.userId}
                {...props}
              />
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
