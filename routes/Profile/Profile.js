import React, { useState } from 'react';
import { Button, Icon } from 'react-native-elements';

import firebase from '../../firebase/firebase.js';
import { PageContainer } from '../../components';
import { APP_PRIMARY_COLOR } from '../../misc/variables.js';
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
        icon={<Icon name="sign-out" type="font-awesome" size={26} />}
        title="Log out"
        onPress={() => signOut()}
        containerStyle={commonStyles.defaultPageButtonContainer}
        buttonStyle={commonStyles.defaultPageButton}></Button>
    </PageContainer>
  );
};

export default Profile;
