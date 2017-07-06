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


class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Main',
  };
  constructor(props)
  {
    super(props);
    console.log(props);

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
            Hello {this.props.user.username}!
        </Text>
        <Text style={styles.description}>

        </Text>
        {this.renderErrorMessage()}



      </View>
    );
  }
}

MainScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

MainScreen.navigationOptions = {
  title: 'MainScreen',
};

// MainScreen.js
const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  return {
    user : state.auth.user,
    error : state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen);
