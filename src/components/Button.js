import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const Button = ()=> {
  return <TouchableOpacity style = {styles.button}>
      <Text style={styles.text}>
        Buy Now
      </Text>
    </TouchableOpacity>
};

const styles = {
  button: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginHorizontal: 5,
  },
  text: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 10,
  }
};

export default Button;