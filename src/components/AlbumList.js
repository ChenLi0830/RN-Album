import React, {Component} from 'react';
import {View, Text} from 'react-native';

class AlbumList extends Component {
  async componentWillMount() {
    console.log("componentWillMount");
    try {
      const fetchRes = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
      console.log("fetchRes", fetchRes);
      const fetchData = await fetchRes.json();
      // debugger;
      console.log("fetchData", fetchData);
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    return <View>
      <Text>AlbumList</Text>
    </View>
  }
}
;

export default AlbumList;