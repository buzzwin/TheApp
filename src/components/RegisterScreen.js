import React, { PropTypes } from 'react';
import { Button, StyleSheet, Text, View , TextInput} from 'react-native';
import {signUp} from '../actions/auth'
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


class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };
  constructor(props)
  {
    super(props);

    this.state = {
         email: '',
         password: '',
         name: '',
         errorMessage: ''
      }
  }
  updateName = (text) => {
      this.setState({name: text})
   }

  updateEmail = (text) => {
      this.setState({email: text})
   }
   updatePassword = (text) => {
      this.setState({password: text})
   }
   login = () => {

      //console.log(this.props);
      this.props.signUp(this.state.email, this.state.password, this.state.name)
      //this.props.navigation.dispatch({ type: 'Login' })
      //console.log(this.props);

   }
   componentDidUpdate(){
     if (this.props.user.uid)
     {
       //console.log(this.props);
       this.props.navigation.dispatch({ type: 'Login' })
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
        Register
        </Text>
        <Text style={styles.description}>
          Register with email and password
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
          onSubmitEditing={(event) => {
            this.refs.ThirdInput.focus();
          }}
          onChangeText = {this.updatePassword}
          />
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
            <TextInput
            ref='ThirdInput'
            style={styles.inputField}
            underlineColorAndroid='transparent'
            placeholder='Name'
            placeholderTextColor='rgba(255,255,255,.6)'
            value={this.state.name}
            onSubmitEditing={(event) => {this.login}}
            onChangeText = {this.updateName}
            />
            </View>
        </View>
        <Button
          onPress = {this.login}
          title="Sign Up"
          color="#AAFF84"
        />
      </View>
    );
  }
}

RegisterScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

RegisterScreen.navigationOptions = {
  title: 'Sign Up',
};

// RegisterScreen.js
const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  return {
    user : state.auth.user,
    error : state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (email, password, name) => dispatch(signUp(email, password, name))
    };
};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);
