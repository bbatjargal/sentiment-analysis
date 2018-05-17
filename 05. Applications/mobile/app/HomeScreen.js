import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    const data = [
      {
        profile: {
          id: '1',
          fullName: 'Boldkhuu Batbaatar',
          picture:
            'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/408563_10200961576779405_976972202_n.jpg?_nc_cat=0&oh=06844cd367cd8e188bad89b11b1af57a&oe=5B935B04',
        },
        posts: {
          optimistic: 80,
          pessimistic: 20,
        },
      },
      {
        profile: {
          id: '2',
          fullName: 'Unubold Tumenbayar',
          picture:
            'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/408563_10200961576779405_976972202_n.jpg?_nc_cat=0&oh=06844cd367cd8e188bad89b11b1af57a&oe=5B935B04',
        },
        posts: {
          optimistic: 70,
          pessimistic: 20,
        },
      },
      {
        profile: {
          id: '3',
          fullName: 'Alex Bayarsaikhan',
          picture:
            'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/408563_10200961576779405_976972202_n.jpg?_nc_cat=0&oh=06844cd367cd8e188bad89b11b1af57a&oe=5B935B04',
        },
        posts: {
          optimistic: 60,
          pessimistic: 20,
        },
      },
      {
        profile: {
          id: '4',
          fullName: 'John Doe',
          picture:
            'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/408563_10200961576779405_976972202_n.jpg?_nc_cat=0&oh=06844cd367cd8e188bad89b11b1af57a&oe=5B935B04',
        },
        posts: {
          optimistic: 20,
          pessimistic: 50,
        },
      },
    ];

    const optimistic = data.filter(({ posts }) => posts.optimistic >= posts.pessimistic);
    const pessimistic = data.filter(({ posts }) => posts.optimistic < posts.pessimistic);

    this.state = {
      optimistic,
      pessimistic,
      selectedTab: 0,
    };

    this.renderItem = this.renderItem.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  renderItem({ item, index }) {
    const { optimistic, pessimistic } = item.posts;
    const firstTabSelected = this.state.selectedTab === 0;
    const percent =
      firstTabSelected
        ? optimistic / (optimistic + pessimistic)
        : pessimistic / (optimistic + pessimistic);
    const backgroundColor = firstTabSelected ? '#6BF178' : '#FF5964';

    return (
      <View style={styles.item}>
        <View style={styles.number}>
          <Text style={styles.numberText}>{index + 1}</Text>
        </View>
        <Image source={{ uri: item.profile.picture }} style={styles.avatar} />
        <View style={styles.right}>
          <Text style={styles.fullName}>{item.profile.fullName}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressBarLine, { flex: percent, backgroundColor }]} />
          </View>
        </View>
      </View>
    );
  }

  changeTab(number) {
    this.setState({ selectedTab: number });
  }

  render() {
    const { optimistic, pessimistic } = this.state;
    const selected = this.state.selectedTab === 0 ? optimistic : pessimistic;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.list}>
          <FlatList
            data={selected}
            renderItem={this.renderItem}
            keyExtractor={item => item.profile.id}
          />
        </ScrollView>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabBarItem, { marginRight: 20 }]}
            onPress={() => {
              this.changeTab(0);
            }}
          >
            <View style={[styles.button, { backgroundColor: '#6BF178' }]}>
              <Text style={styles.buttonText}>OPTIMISTIC</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabBarItem}
            onPress={() => {
              this.changeTab(1);
            }}
          >
            <View style={[styles.button, { backgroundColor: '#FF5964' }]}>
              <Text style={styles.buttonText}>PESSIMISTIC</Text>
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
    backgroundColor: '#eee',
    paddingTop: 22,
  },
  item: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  number: {
    justifyContent: 'center',
    width: 35,
  },
  numberText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#aaa',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  right: {
    flex: 1,
    justifyContent: 'center',
  },
  fullName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  progressBar: {
    backgroundColor: '#aaa',
    height: 6,
    borderRadius: 3,
    flexDirection: 'row',
  },
  progressBarLine: {
    backgroundColor: '#6BF178',
    height: 6,
    borderRadius: 3,
  },

  tabBar: {
    flexDirection: 'row',
    padding: 20,
  },
  tabBarItem: {
    flex: 1,
  },
  button: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
  },
});
