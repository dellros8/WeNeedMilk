import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

import Navbar from '../Navbar/Navbar.js';
import { APP_PRIMARY_COLOR } from '../../misc/variables.js';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  pageTitle: {
    color: APP_PRIMARY_COLOR,
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
      <SafeAreaView style={styles.wrapper}>
        <StatusBar />
        <Navbar openDrawer={openDrawer} />
        <View style={styles.container}>
          <Text style={styles.pageTitle}>{title}</Text>
          {children}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PageContainer;
