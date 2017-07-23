import React, { PropTypes } from 'react';
import { Button, StyleSheet, Text, View , TextInput} from 'react-native';
import {connect} from 'react-redux';
import {checkLogin} from '../actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFF584',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: '#FFF584',
    marginBottom: 20
  },
});


class HomeScreen extends React.Component {
  //static navigationOptions = {
  //  title: 'Home',
  //};
  constructor(props)
  {
    super(props);
  
  }

  componentDidMount() {
    console.log("componentDidMount", Date.now());
    this.props.dispatch(checkLogin());
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Platform
        </Text>
        <Text style={styles.description}>
          Service Delivery Platform
        </Text>
        <Button
          onPress={() => this.props.navigation.dispatch({ type: 'Login' })}
          title="Log in"
          color="#AAFF84"
        />
        <Button
          onPress={() => this.props.navigation.dispatch({ type: 'Register' })}
          title="Sign Up"
          color="#F11984"
        />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

HomeScreen.navigationOptions = {
  title: 'Home',
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkLogin())
  };
};

export default connect()(HomeScreen);
