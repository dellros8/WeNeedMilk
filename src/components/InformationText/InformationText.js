import React from 'react';
import { Text } from 'react-native';

import styles from './InformationTextStyle.js';

const InformationText = ({ children, text }) => <Text style={styles.text}>{children || text}</Text>;

export default InformationText;
