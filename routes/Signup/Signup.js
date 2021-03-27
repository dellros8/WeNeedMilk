import React, { useState } from 'react';
import { Button, Input, Text, Icon } from 'react-native-elements';

import firebase from '../../firebase/firebase.js';
import { PageContainer } from '../../components';
import { APP_PRIMARY_COLOR } from '../../misc/variables.js';
import commonStyles from '../../styles/CommonStyles.js';

const Signup = ({ navigation }) => {
  const [signingUp, setSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const signUp = () => {
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
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Sign up">
      <Input
        leftIcon={<Icon name="envelope" type="font-awesome" size={18} color="black" iconStyle={commonStyles.inputLeftIcon} />}
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
      <Input
        leftIcon={
          <Icon name="lock" type="font-awesome" size={24} color="black" iconStyle={commonStyles.inputLeftIcon} />
        }
        placeholder="Confirm Password"
        secureTextEntry={true}
        label="Confirm Password"
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
