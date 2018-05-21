import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import Loader from './Loader';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
    };

    this.goToFriends = this.goToFriends.bind(this);
  }

  async componentDidMount() {
    this.setState({
      profile: await this.fetchData(),
    });
  }

  async fetchData() {
    try {
      const token = await AsyncStorage.getItem('token');
      const url = `${API_URL}/profile?accesstoken=${token}`;
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      let data = await fetch(url, headers);
      return await data.json();
    } catch (error) {
      console.error(error);
    }
  }

  goToFriends() {
    this.props.navigation.navigate('Friends');
  }

  render() {
    const { profile } = this.state;

    if (!profile) return <Loader text="Analyzing" />;

    const { positive, negative } = profile.posts;
    const percent = Math.round(
      (positive >= negative ? positive / (positive + negative) : negative / (positive + negative)) *
        100,
    );

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>{'Which person are you?'.toUpperCase()}</Text>
          <Image source={{ uri: profile.picture }} style={styles.avatar} />
          <Text style={styles.fullName}>{profile.name}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.percent}>{percent}%</Text>
          <Text style={styles.result}>{positive >= negative ? 'optimistic' : 'pessimistic'}</Text>
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
