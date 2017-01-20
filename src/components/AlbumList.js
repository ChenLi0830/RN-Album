import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import AlbumDetails from './AlbumDetails';

class AlbumList extends Component {
  constructor(props){
    super(props);
    this.state = {albums: []};
  }
  
  async componentWillMount() {
    console.log("componentWillMount");
    try {
      const fetchRes = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
      // console.log("fetchRes", fetchRes);
      const fetchData = await fetchRes.json();
      // debugger;
      this.setState({albums: fetchData});
      // console.log("fetchData", fetchData);
    } catch (err) {
      console.error(err);
    }
  }
  
  render() {
    const albums = this.state.albums.map(album => <AlbumDetails key = {album.title} album={album}/>);
    return <ScrollView>
      {albums}
    </ScrollView>
  }
}
;

export default AlbumList;