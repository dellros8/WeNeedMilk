import React, { useState } from 'react';
import { Button, Input, Text, Icon } from 'react-native-elements';

import { signUp, setUser } from '../../firebase/functions.js';
import { PageContainer } from '../../components';
import commonStyles from '../../styles/CommonStyles.js';

const Signup = ({ navigation }) => {
  const [signingUp, setSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const onSignUp = () => {
    if (password === confirmPassword) {
      setSigningUp(true);
      signUp(email, password)
        .then(({ user }) => {
          setUser(user.uid, user.email).then(() => {
            navigation.navigate('authenticate');
          });
          setSigningUp(false);
        })
        .catch((error) => {
          setError(error.message);
          setSigningUp(false);
        });
    } else {
      setError('Lösenorden stämmer inte överens');
    }
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Skapa konto">
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
      <Input
        leftIcon={
          <Icon name="lock" type="font-awesome" size={24} color="black" iconStyle={commonStyles.inputLeftIcon} />
        }
        placeholder="Bekräfta lösenord"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        containerStyle={commonStyles.defaultPageInputContainer}
      />
      {error ? <Text style={commonStyles.formErrorText}>{error}</Text> : null}
      <Button
        containerStyle={commonStyles.defaultPageButtonContainer}
        buttonStyle={commonStyles.defaultPageButton}
        loading={signingUp}
        title="Sign up"
        onPress={() => onSignUp()}></Button>
    </PageContainer>
  );
};

export default Signup;
