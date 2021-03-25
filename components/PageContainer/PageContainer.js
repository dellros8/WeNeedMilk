import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

import Navbar from '../Navbar/Navbar.js';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  pageTitle: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

const PageContainer = ({ openDrawer, title, children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.wrapper}>
        <StatusBar />
        <Navbar openDrawer={openDrawer} />
        <View style={styles.container}>
          <Text style={styles.pageTitle}>{title}</Text>
          {children}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PageContainer;
