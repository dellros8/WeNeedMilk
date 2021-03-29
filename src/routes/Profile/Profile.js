import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { signOut } from '../../firebase/functions.js';
import { PageContainer, InformationText } from '../../components';
import commonStyles from '../../styles/CommonStyles.js';
import { DARK_GREY } from '../../misc/variables.js';

const Profile = ({ navigation, userEmail }) => {
  const [signingOut, setSigningOut] = useState(false);

  const onSignOut = () => {
    setSigningOut(true);
    signOut().then(() => setSigningOut(false));
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title={userEmail}>
      <InformationText>
        Här finns inte så mycket ännu. Letar du efter något? Skicka gärna förslag till dellros.simon@gmail.com
      </InformationText>
      <Button
        loading={signingOut}
        icon={<Icon name="sign-out" type="font-awesome" size={26} style={{ marginRight: 5 }} />}
        title="Logga ut"
        onPress={() => onSignOut()}
        containerStyle={commonStyles.defaultPageButtonContainer}
        buttonStyle={commonStyles.defaultPageButton}></Button>
    </PageContainer>
  );
};

export default Profile;
