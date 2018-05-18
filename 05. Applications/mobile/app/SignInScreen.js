import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import Expo from 'expo';
import { API_URL, FACEBOOK_APP_ID } from 'react-native-dotenv';

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
      permissions: ['public_profile', 'email', 'user_friends', 'user_posts'],
    });

    if (type !== 'success') return;

    AsyncStorage.setItem('token', token).then(() => {
      this.props.navigation.navigate('App');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>mistic</Text>
          </View>
          <Text style={styles.description}>{'Are you optimistic or pessimistic?'}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.bottomText}>start with</Text>
          <TouchableOpacity onPress={this.handleLogin}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{'Login with Facebook'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottom: {
    flex: 1,
    backgroundColor: '#35A7FF',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  logo: {
    marginBottom: 20,
  },
  logoText: {
    textAlign: 'center',
    color: '#35A7FF',
    fontSize: 58,
    fontWeight: '800',
  },
  description: {
    textAlign: 'center',
    color: '#888',
    fontSize: 18,
  },

  bottomText: {
    color: '#fff',
    marginBottom: 16,
    fontSize: 18,
  },
  button: {
    height: 46,
    backgroundColor: '#fff',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
  },
  buttonText: {
    color: '#35A7FF',
    fontSize: 14,
    fontWeight: '700',
  },
});
