import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from './firebase/firebase.js'
import { Button, Input, Text } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const signUp = async () => {
    try {
      firebase.auth().createUserWithEmailAndPassword(email, confirmPassword)
    } catch(err) {
      setError(err.message)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Input label="Email" value={email} onChangeText={setEmail} />
      <Input label="Password" value={password} onChangeText={setPassword} />
      <Input label="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} />
      { error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Submit" onPress={() => signUp()}></Button>
    </View>
  );
}

export default App;
