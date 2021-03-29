import React, { useState } from 'react';
import { Button, Input, Text, Icon } from 'react-native-elements';

import firebase from '../../firebase/config.js';
import { PageContainer } from '../../components';
import commonStyles from '../../styles/CommonStyles.js';

const Signup = ({ navigation }) => {
  const [signingUp, setSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const signUp = () => {
    if (password === confirmPassword) {
      setSigningUp(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, confirmPassword)
        .then(({ user }) => {
          firebase
            .database()
            .ref('users/' + user.uid)
            .set({ userId: user.uid, email: user.email });
          navigation.navigate('authenticate');
        })
        .catch((error) => {
          setError(error.message);
        })
        .then(() => setSigningUp(false));
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
        label="E-post"
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
        label="Lösenord"
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
        label="Bekräfta lösenord"
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
        onPress={() => signUp()}></Button>
    </PageContainer>
  );
};

export default Signup;
