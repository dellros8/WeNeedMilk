import React, { useState } from 'react';
import { Button, Icon } from 'react-native-elements';

import firebase from '../../firebase/config.js';
import { PageContainer } from '../../components';
import commonStyles from '../../styles/CommonStyles.js';

const Profile = ({ navigation, userEmail }) => {
  const [signingOut, setSigningOut] = useState(false);

  const signOut = () => {
    setSigningOut(true);
    firebase
      .auth()
      .signOut()
      .then(() => setSigningOut(false));
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title={userEmail}>
      <Button
        loading={signingOut}
        icon={<Icon name="sign-out" type="font-awesome" size={26} style={{ marginRight: 5 }} />}
        title="Logga ut"
        onPress={() => signOut()}
        containerStyle={commonStyles.defaultPageButtonContainer}
        buttonStyle={commonStyles.defaultPageButton}></Button>
    </PageContainer>
  );
};

export default Profile;
