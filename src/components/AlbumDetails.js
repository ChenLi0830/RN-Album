import React from 'react';
import {View, Text, Image, Linking} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const AlbumDetails = ({album}) => {
  const {title, artist, thumbnail_image, image, url} = album;
  
  return <Card>
    <CardSection>
      <View style = {styles.thumbnailContainer}>
        <Image style={styles.thumbnail}
               source={{uri: thumbnail_image}}
        />
      </View>
      <View style={styles.textView}>
        <Text style = {styles.headerText}>{title}</Text>
        <Text>{artist}</Text>
      </View>
    </CardSection>
  
    <CardSection>
      <Image style = {styles.imageStyle}
             source={{uri: image}}
             />
    </CardSection>
  
    <CardSection>
      <Button onPress={()=>Linking.openURL(url)}>
        Buy Now
      </Button>
    </CardSection>
  </Card>
};

const styles = {
  imageStyle: {
    height: 300,
    flex: 1,
    width: null,
  },
  
  thumbnail: {
    height: 50,
    width: 50,
  },
  
  headerText: {
    fontSize: 18,
  },
  
  thumbnailContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  }
};

export default AlbumDetails;