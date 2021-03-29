import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, Icon, Overlay } from 'react-native-elements';

import { APP_PRIMARY_COLOR, GREY, LIGHT_GREY } from '../../misc/variables.js';
import commonStyles from '../../styles/CommonStyles.js';
import { copyToClipboard } from '../../misc/helpers.js';
import styles from './SharedListStyle.js';

const CopyCodeOverlay = ({ isVisible, closeOverlay, sharedListCode }) => {
  const [copiedString, setCopiedString] = useState('');

  const onClose = () => {
    setCopiedString('');
    closeOverlay();
  };

  return (
    <Overlay isVisible={isVisible} onBackdropPress={() => onClose()} overlayStyle={commonStyles.overlay}>
      <View style={commonStyles.overlayChildContainer}>
        <Text style={commonStyles.overlayTitle}>Kopiera kod</Text>
        <TouchableOpacity
          style={styles.copyCodeDescriptionContainer}
          onPress={() => copyToClipboard(sharedListCode, setCopiedString)}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 10 }}>{sharedListCode}</Text>
          <Icon name="clipboard" type="font-awesome" size={60} />
        </TouchableOpacity>
        {copiedString ? <Text style={{ marginTop: 10 }}>Koden har kopierats</Text> : null}
        <Button
          onPress={() => onClose()}
          title="Stäng"
          buttonStyle={commonStyles.overlayPrimaryButton}
          containerStyle={commonStyles.overlayPrimaryButtonContainer}></Button>
      </View>
    </Overlay>
  );
};

export default CopyCodeOverlay;
