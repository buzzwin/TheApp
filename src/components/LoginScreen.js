import React, { PropTypes } from 'react';
import { Button, StyleSheet, Text, View , TextInput} from 'react-native';
import {login} from '../actions/auth'
import {connect} from 'react-redux'

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
  inputContainer: {
    backgroundColor: 'rgba(0,0,0,.3)',
    borderRadius: 5
  },
  inputField: {
    width: 280,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#fff',
    backgroundColor: '#300039'
  },

  textInput: {
   padding: 4, marginLeft : 30, marginRight: 30, marginTop: 20, fontSize: 18, borderWidth: 1, borderRadius: 4, borderColor: '#E6E5ED', backgroundColor: '#F8F8F9', justifyContent: 'flex-start', height: 40, marginLeft : 20
}
});


class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor(props)
  {
    super(props);

    this.state = {
         email: 'abc@abc.com',
         password: 'abc123',
         errorMessage: ''
      }
  }


  updateEmail = (text) => {
      this.setState({email: text})
   }
   updatePassword = (text) => {
      this.setState({password: text})
   }
   login = () => {

      //console.log(this.props);
      this.props.login(this.state.email, this.state.password)
      //this.props.navigation.dispatch({ type: 'Login' })
      //console.log(this.props);

   }
   componentDidUpdate(){
     //console.log(this.props);
     if (this.props.user.uid)
     {
       //console.log(this.props);
       this.props.navigation.dispatch({ type: 'Main' }, this.props.user)
     }
   }

renderErrorMessage(){
  if (this.props.error) {
    const errorMessage = this.props.error.message
    return (
      <Text style={styles.description}>
        {errorMessage}
      </Text>
    )

  }


}

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
        Login
        </Text>
        <Text style={styles.description}>
          Login with email and password
        </Text>
        {this.renderErrorMessage()}

        <View style={[styles.inputContainer, { marginBottom: 10 }]}>
          <TextInput
          style={styles.inputField}
          underlineColorAndroid='transparent'
          placeholder='Email'
          autoCorrect={false}
          keyboardType='email-address'
          autoCapitalize='none'
          placeholderTextColor='rgba(255,255,255,.6)'
          value={this.state.email}
          onSubmitEditing={(event) => {
            this.refs.SecondInput.focus();
          }}
          onChangeText = {this.updateEmail}
          />
        </View>
        <View style={[styles.inputContainer, { marginBottom: 10 }]}>
          <TextInput
          ref='SecondInput'
          style={styles.inputField}
          underlineColorAndroid='transparent'
          placeholder='Password'
          secureTextEntry={true}
          placeholderTextColor='rgba(255,255,255,.6)'
          value={this.state.password}
          onSubmitEditing={(event) => {this.login}}
          onChangeText = {this.updatePassword}
          />
        </View>
        <Button
          onPress = {this.login}
          title="Log in"
          color="#AAFF84"
        />
      </View>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

LoginScreen.navigationOptions = {
  title: 'Log In',
};

// LoginScreen.js
const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  return {
    user : state.auth.user,
    error : state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password))
    };
};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
