import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Text, Icon } from 'react-native-elements';

import { signIn } from '../../firebase/functions.js';
import { PageContainer } from '../../components';
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
    signIn(email, password)
      .then(() => {
        setLoggingIn(false);
      })
      .catch((error) => {
        setLoggingIn(false);
        setError(error.message);
      });
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Logga in">
      <Input
        leftIcon={
          <Icon name="envelope" type="font-awesome" size={18} color="black" iconStyle={commonStyles.inputLeftIcon} />
        }
        placeholder="E-post"
        value={email}
        onChangeText={setEmail}
        containerStyle={commonStyles.defaultPageInputContainer}
      />
      <Input
        leftIcon={
          <Icon name="lock" type="font-awesome" size={24} color="black" iconStyle={commonStyles.inputLeftIcon} />
        }
        placeholder="Lösenord"
        secureTextEntry={true}
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
        title="Logga in"
        onPress={() => login()}
      />
    </PageContainer>
  );
};

export default Login;
