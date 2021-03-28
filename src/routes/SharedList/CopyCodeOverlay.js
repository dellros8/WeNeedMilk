import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Text, Icon, Overlay } from 'react-native-elements';

import { APP_PRIMARY_COLOR } from '../../misc/variables.js';
import commonStyles from '../../styles/CommonStyles.js';
import { copyToClipboard } from '../../misc/helpers.js';

const CopyCodeOverlay = ({ isVisible, closeOverlay, sharedListCode }) => {
  const [copiedString, setCopiedString] = useState('');

  const onClose = () => {
    setCopiedString('');
    closeOverlay();
  };

  return (
    <Overlay isVisible={isVisible} onBackdropPress={() => onClose()} overlayStyle={commonStyles.overlay}>
      <View style={commonStyles.overlayChildContainer}>
        <Text style={commonStyles.overlayTitle}>Copy Code</Text>
        <View style={commonStyles.overlayDescription}>
          <TouchableOpacity onPress={() => copyToClipboard(sharedListCode, setCopiedString)}>
            <Icon name="clipboard" type="font-awesome" color={APP_PRIMARY_COLOR} size={80} />
          </TouchableOpacity>
          {copiedString ? (
            <Text>
              Code <Text style={{ fontWeight: 'bold', color: APP_PRIMARY_COLOR }}>{copiedString}</Text> Successfully
              Copied!
            </Text>
          ) : null}
        </View>
        <Button
          onPress={() => onClose()}
          title="Close"
          buttonStyle={commonStyles.overlayPrimaryButton}
          containerStyle={commonStyles.overlayPrimaryButtonContainer}></Button>
      </View>
    </Overlay>
  );
};

export default CopyCodeOverlay;
