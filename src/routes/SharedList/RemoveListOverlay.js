import React from 'react';
import { View } from 'react-native';
import { Button, Text, Overlay } from 'react-native-elements';

import { removeList } from '../../firebase/functions.js';
import { DARK_RED } from '../../misc/variables.js';
import commonStyles from '../../styles/CommonStyles.js';

const RemoveListOverlay = ({ isVisible, closeOverlay, sharedListCode, userId, navigateToPersonalList }) => {
  const onRemoveList = () => {
    removeList(sharedListCode, userId).then(() => {
      navigateToPersonalList();
      closeOverlay();
    });
  };
  return (
    <Overlay isVisible={isVisible} onBackdropPress={closeOverlay} overlayStyle={commonStyles.overlay}>
      <View style={commonStyles.overlayChildContainer}>
        <Text style={commonStyles.overlayTitle}>Ta bort lista</Text>
        <Text style={commonStyles.overlayDescription}>
          Är du säker på att du vill ta bort denna lista från ditt konto?
        </Text>
        <Button
          onPress={() => onRemoveList()}
          title="Ta bort"
          buttonStyle={{ backgroundColor: DARK_RED }}
          containerStyle={commonStyles.overlayPrimaryButtonContainer}></Button>
        <Button
          onPress={closeOverlay}
          title="Avbryt"
          type="outline"
          titleStyle={commonStyles.overlaySecondaryButtonTitle}
          buttonStyle={commonStyles.overlaySecondaryButton}
          containerStyle={commonStyles.overlaySecondaryButtonContainer}></Button>
      </View>
    </Overlay>
  );
};

export default RemoveListOverlay;
