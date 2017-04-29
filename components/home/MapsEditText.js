import React, { Component } from 'react';

import {
  Dimensions,
} from 'react-native'

var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
var width = Dimensions.get('window').width; //full width

export default class MapsEditText extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <GooglePlacesAutocomplete
        key={this.props.id}
        placeholder={this.props.placeholder}
        minLength={2}
        autoFocus={false}
        fetchDetails={true}
        query={{
          key: 'AIzaSyCjxNJM-7aYVKnFGoQwR0oj0hgg9-nGxpY',
          language: 'en',
          types: 'geocode'
        }}
        onPress={(data, details = null) => {
          this.props.onPress(details.geometry.location.lat, details.geometry.location.lng, details.formatted_address, this.props.id)
        }}
        styles={{textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth:0,
          width: width,
          height: 45,
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: '#5d5d5d',
          fontSize: 16,
          width: 250,
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        },
        listView: {
          backgroundColor: '#FFFFFF'
        },
        poweredContainer: {
          backgroundColor: '#FFFFFF'
        }
      }}
      currentLocation={false}/>
    )
  }
}
