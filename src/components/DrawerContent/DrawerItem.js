import React, { useEffect, useState } from 'react';
import { Icon, ListItem } from 'react-native-elements';

import { APP_PRIMARY_COLOR } from '../../misc/variables.js';
import styles from './DrawerContentStyle.js';

const DrawerItem = ({ navigation, to, disabled, disabledStyle, iconName, iconSize, text }) => {
  const [activeStyle, setActiveStyle] = useState({});

  const navigationState = navigation.dangerouslyGetState();
  const activeRouteIndex = navigation.dangerouslyGetState().index;

  useEffect(() => {
    const activeRouteName = navigationState.routeNames[activeRouteIndex];

    setRouteActiveStyle(activeRouteName);

    return () => {
      setActiveStyle({});
    };
  }, [navigationState.routes[activeRouteIndex]]);

  const setRouteActiveStyle = (activeRouteName) => {
    if (activeRouteName === 'sharedlist' && to.params) {
      if (to.params.sharedListCode === navigationState.routes[activeRouteIndex].params.sharedListCode) {
        setActiveStyle(styles.drawerItemActive);
      }
    } else {
      if (to === activeRouteName) {
        setActiveStyle(styles.drawerItemActive);
      }
    }
  };

  return (
    <ListItem
      disabled={disabled}
      disabledStyle={disabledStyle}
      containerStyle={activeStyle}
      onPress={() => navigation.navigate(to)}>
      <Icon name={iconName} type="font-awesome" color={APP_PRIMARY_COLOR} size={iconSize} />
      <ListItem.Content>
        <ListItem.Title>{text}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default DrawerItem;
