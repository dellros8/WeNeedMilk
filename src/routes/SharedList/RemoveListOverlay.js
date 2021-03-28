import React from 'react';
import { View } from 'react-native';
import { Button, Text, Overlay } from 'react-native-elements';

import { firebaseDB } from '../../firebase/config.js';
import { DARK_RED } from '../../misc/variables.js';
import commonStyles from '../../styles/CommonStyles.js';

const RemoveListOverlay = ({ isVisible, closeOverlay, sharedListCode, userId, navigateToQuickList }) => {
  const removeList = () => {
    firebaseDB
      .ref(`users/${userId}/myshoppinglists/${sharedListCode}`)
      .remove()
      .then(() => {
        navigateToQuickList();
        closeOverlay();
      });
  };
  return (
    <Overlay isVisible={isVisible} onBackdropPress={closeOverlay}>
      <View style={commonStyles.overlayChildContainer}>
        <Text style={commonStyles.overlayTitle}>Remove List</Text>
        <Text style={commonStyles.overlayDescription}>
          Are you sure you want to remove this list from your account?
        </Text>
        <Button
          onPress={() => removeList()}
          title="Remove List"
          buttonStyle={{ backgroundColor: DARK_RED }}
          containerStyle={commonStyles.overlayPrimaryButtonContainer}></Button>
        <Button
          onPress={closeOverlay}
          title="Cancel"
          type="outline"
          titleStyle={commonStyles.overlaySecondaryButtonTitle}
          buttonStyle={commonStyles.overlaySecondaryButton}
          containerStyle={commonStyles.overlaySecondaryButtonContainer}></Button>
      </View>
    </Overlay>
  );
};

export default RemoveListOverlay;
