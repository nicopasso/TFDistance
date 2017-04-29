
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  Navigator,
  Dimensions,
  Button,
  Alert,
  Text
} from 'react-native';

import 'geolib';

import MapView from 'react-native-maps';
import MapsEditText from './MapsEditText'

var LATITUDE_DELTA = 0.0922
var LONGITUDE_DELTA = 0.0922

var SharedPreferences = require('react-native-shared-preferences');

export default class HomeActivity extends Component {
  constructor(props) {
    super(props)
    this.showHistoryLog = this.showHistoryLog.bind(this);

    this.state = {
      coordinates: [],
      buttonDisabled: true,
      region: {
        latitude: 52.520008,
        longitude: 13.404954,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      count: 0,
    }
  }

  addCoordinates(lat, lng, name, id) {
    var marker = {
      'key': id,
      'latlng': {
        'latitude': lat,
        'longitude': lng
      },
      'title': name,
    };

    if (this.state.coordinates.length != 2) {
      this.state.coordinates.push(marker)
    } else {
      this.state.coordinates[id] = marker
    }

    this.setState({buttonDisabled: this.state.coordinates.length != 2})

    this.state.markers.push(marker)
    var newRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    this.onRegionChange(newRegion)
  }

  calculateDistance() {
    var distance = geolib.getDistance(
      this.state.coordinates[0].latlng, this.state.coordinates[1].latlng);
      var source = this.state.coordinates[0].title
      var destination = this.state.coordinates[1].title

      var message = 'The distance between ' + source + ' and ' + destination + ' is '  + distance/1000 + 'km'
      Alert.alert('Distance:', message);

      SharedPreferences.setItem(this.state.count.toString(), message);
      this.state.count++
      SharedPreferences.setItem("total_count", this.state.count.toString())
    }

    onRegionChange(newRegion) {
      //This let the user to see the selected city on the map
      //but this line of code thorws an error when the user applies some gesture on the map (pan, zoom)
      this.setState({region: newRegion});
    }

    showHistoryLog() {
      var navigator = this.props.navigator
      var datasource = []
      SharedPreferences.getItem("total_count", function(value) {
        for (var i = 0; i < value; i++) {
          SharedPreferences.getItem(i.toString(), function(innerValue) {
            datasource.push(innerValue)
          })
        }
      })

      //Wait for the SharedPreferences method
      this.sleep(500).then(() => {
        if (datasource.length != 0) {
          navigator.push({
            name: 'History',
            title: 'History',
            datasource: {datasource}
          })
        } else {
          Alert.alert("", "You don't have a history! :-)")
        }
      })
    }

    sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    render() {

      return (
        <View style={styles.container}>
        <MapView.Animated style={{flex: 1}}
        zoomEnabled={true}
        region={this.state.region}
        onRegionChange={this.onRegionChange}>
        {this.state.markers.map(marker => (
          <MapView.Marker
          key={marker.key}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}/>
        ))}
        </MapView.Animated>
        <View style={{position: 'absolute', left: 16, top: 16, right: 16, backgroundColor: 'transparent'}}>
        <MapsEditText
        placeholder="From:"
        onPress= {(lat, lng, name, id) => this.addCoordinates(lat, lng, name, id)}
        id="0"/>
        </View>
        <View style={{position: 'absolute', left: 16, top: 62, right: 16, backgroundColor: 'transparent'}}>
        <MapsEditText
        placeholder="To:"
        onPress= {(lat, lng, name, id) => this.addCoordinates(lat, lng, name, id)}
        id="1"/>
        </View>
        <View style={{position: 'absolute', left: 16, right: 16, top: 440}}>
        <Button
        color='#FF625C'
        onPress={this.showHistoryLog}
        title="Calculation History Log"
        />
        </View>
        <View style={{position: 'absolute', left: 16, right: 16, top: 500}}>
        <Button
        color='#32c850'
        onPress={this.calculateDistance.bind(this)}
        title="Calculate distance"
        disabled={this.state.buttonDisabled}/>
        </View>
        </View>

      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: '#00897B'
    }
  });
