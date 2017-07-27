import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import styles from './Styles/DrawerButtonStyles';

const DrawerButton = ({ navigation }) => (
    <TouchableOpacity
        onPress={() => navigation.navigate('DrawerOpen')}
        //style={styles.buttonStyle}
    >
        <Icon
            name="menu"
            size={28}
            style={{ paddingLeft: 15 }}
            //style={styles.iconStyle}
        />
    </TouchableOpacity>
);

DrawerButton.propTypes = {
    navigation: React.PropTypes.object.isRequired,
};

export default DrawerButton;
