import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    AsyncStorage.getItem('profile').then(data => {
      this.state = {
        profile: JSON.parse(data),
      };
    });

    this.goToFriends = this.goToFriends.bind(this);
  }

  goToFriends() {
    this.props.navigation.navigate('Friends');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>{'Which person are you?'.toUpperCase()}</Text>
          <Image
            source={{
              uri:
                'https://lookaside.facebook.com/platform/profilepic/?asid=1787578441308166&height=50&width=50&ext=1526850530&hash=AeSE-G5stABqM_aW',
            }}
            style={styles.avatar}
          />
          <Text style={styles.fullName}>Boldkhuu Batbaatar</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.percent}>85%</Text>
          <Text style={styles.result}>optimistic</Text>
          <TouchableOpacity style={styles.tabBarItem} onPress={this.goToFriends}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{'How about my friends?'.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.disclaimer}>
            {'You can only see the your friends\rwho uses Mistic'}
          </Text>
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
    backgroundColor: '#457B9D',
    alignItems: 'center',
    paddingTop: 50,
  },
  bottom: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    letterSpacing: 1,
    marginBottom: 30,
    fontSize: 18,
    color: '#fff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  fullName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 40,
    color: '#fff',
  },
  percent: {
    fontSize: 82,
    color: '#888',
  },
  result: {
    fontSize: 48,
    color: '#888',
    marginBottom: 50,
  },
  button: {
    height: 50,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: '#457B9D',
    borderRadius: 6,
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
  },
  disclaimer: {
    color: '#aaa',
  },
});
