import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Text, Icon } from 'react-native-elements';

import firebase from '../../firebase/firebase.js';
import { PageContainer } from '../../components';
import { APP_PRIMARY_COLOR } from '../../misc/variables.js';
import commonStyles from '../../styles/CommonStyles.js';

const styles = StyleSheet.create({
  logInButton: {
    width: '100%',
  },
});

const Login = ({ navigation }) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = () => {
    setLoggingIn(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error.message);
      })
      .then(() => setLoggingIn(false));
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Log in">
      <Input
        leftIcon={
          <Icon name="envelope" type="font-awesome" size={18} color="black" iconStyle={commonStyles.inputLeftIcon} />
        }
        placeholder="Email Address"
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        containerStyle={commonStyles.defaultPageInputContainer}
      />
      <Input
        leftIcon={
          <Icon name="lock" type="font-awesome" size={24} color="black" iconStyle={commonStyles.inputLeftIcon} />
        }
        placeholder="Password"
        secureTextEntry={true}
        label="Password"
        value={password}
        onChangeText={setPassword}
        containerStyle={commonStyles.defaultPageInputContainer}
      />
      {error ? <Text style={commonStyles.formErrorText}>{error}</Text> : null}
      <Button
        containerStyle={commonStyles.defaultPageButtonContainer}
        buttonStyle={commonStyles.defaultPageButton}
        loading={loggingIn}
        style={styles.logInButton}
        title="Log in"
        onPress={() => login()}
      />
    </PageContainer>
  );
};

export default Login;
