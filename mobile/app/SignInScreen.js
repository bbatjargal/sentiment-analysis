import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import Expo from 'expo';

export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin() {
    const appId = 'app-id-must-be-here';
    const permissions = ['public_profile', 'email', 'user_friends'];

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
      permissions,
    });

    // TODO:
    // Send facebook token to the server and
    // receive the results
    const data = [
      {
        fullName: 'Boldkhuu Batbaatar',
        posts: {
          optimistic: 80,
          pessimistic: 20,
        },
      },
    ];

    if (type === 'success') {
      this.props.navigation.navigate('App', { data });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>Optimistic</Text>
            <Text style={styles.logoText}>Pessimistic</Text>
          </View>
          <Text style={styles.description}>
            {'Do you want to know which of your\rFacebook friends are\roptimistic or pessimistic?'}
          </Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.bottomText}>Start with</Text>
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
    fontSize: 32,
    fontWeight: '700',
  },
  logoSeparator: {
    height: 1,
    width: 160,
    backgroundColor: '#35A7FF',
  },
  description: {
    textAlign: 'center',
    color: '#888',
  },

  bottomText: {
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    padding: 14,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  buttonText: {
    color: '#35A7FF',
    fontSize: 14,
  },
});
