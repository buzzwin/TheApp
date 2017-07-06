import React, { PropTypes } from 'react';
//import { Button, StyleSheet, Text, View , TextInput, FlatList} from 'react-native';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

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
  row: {
    fontSize: 13,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
         errorMessage: '',
         loading: false,
         data: [],
         page: 1,
         seed: 1,
         error: null,
         refreshing: false
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

   componentDidMount() {
     this.makeRemoteRequest();
   }

   makeRemoteRequest = () => {
     const { page, seed } = this.state;
     const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
     this.setState({ loading: true });

     fetch(url)
       .then(res => res.json())
       .then(res => {
         this.setState({
           data: page === 1 ? res.results : [...this.state.data, ...res.results],
           error: res.error || null,
           loading: false,
           refreshing: false
         });
       })
       .catch(error => {
         this.setState({ error, loading: false });
       });
   };

   handleRefresh = () => {
     this.setState(
       {
         page: 1,
         seed: this.state.seed + 1,
         refreshing: true
       },
       () => {
         this.makeRemoteRequest();
       }
     );
   };

   handleLoadMore = () => {
     this.setState(
       {
         page: this.state.page + 1
       },
       () => {
         this.makeRemoteRequest();
       }
     );
   };

   renderSeparator = () => {
     return (
       <View
         style={{
           height: 1,
           width: "86%",
           backgroundColor: "#CED0CE",
           marginLeft: "14%"
         }}
       />
     );
   };

   renderHeader = () => {
     return <SearchBar placeholder="Type Here..." lightTheme round />;
   };

   renderFooter = () => {
     if (!this.state.loading) return null;

     return (
       <View
         style={{
           paddingVertical: 20,
           borderTopWidth: 1,
           borderColor: "#CED0CE"
         }}
       >
         <ActivityIndicator animating size="large" />
       </View>
     );
   };

   render() {
     return (
       <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
         <FlatList
           data={this.state.data}
           renderItem={({ item }) => (
             <ListItem
               roundAvatar
               title={`${item.name.first} ${item.name.last}`}
               subtitle={item.email}
               avatar={{ uri: item.picture.thumbnail }}
               containerStyle={{ borderBottomWidth: 0 }}
             />
           )}
           keyExtractor={item => item.email}
           ItemSeparatorComponent={this.renderSeparator}
           ListHeaderComponent={this.renderHeader}
           ListFooterComponent={this.renderFooter}
           onRefresh={this.handleRefresh}
           refreshing={this.state.refreshing}
           onEndReached={this.handleLoadMore}
           onEndReachedThreshold={50}
         />
       </List>
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
