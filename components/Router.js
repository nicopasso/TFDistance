import React, { Component } from 'react'

import {
  StyleSheet,
  Image,
  Navigator,
  TouchableOpacity,
  Text
} from 'react-native'

import HomeActivity from './home/HomeActivity'
import HistoryActivity from './history/HistoryActivity'

//NavigaionBar sublcass to hide the NavigationBar in the HomeActivity
class NavigationBar extends Navigator.NavigationBar {
    render() {
        var routes = this.props.navState.routeStack;
        if(routes.length) {
            var route = routes[routes.length -1];
        }

        if(!route.display) {
            return null;
        }
        return super.render();
    }
}

export default class Router extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'Home', title: 'Home'}}
        renderScene={this.renderScene}
        navigationBar = {
          <NavigationBar
            style = {styles.navigationBar}
            routeMapper = { NavigationBarRouteMapper } />
        }
      />
    );
  }

  renderScene(route, navigator) {
    route.display = true;
    if (route.name == 'Home') {
      route.display = false;
      return (
        <HomeActivity
          navigator = {navigator}
          {...route.passProps}/>
      )
    }

    if (route.name == 'History') {
      return (
        <HistoryActivity
          navigator = {navigator}
          datasource = {route.datasource}
          {...route.passProps} />
      )
    }
  }
}
  var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
      if (index > 0) {
        return (
          <TouchableOpacity
            style={{top: 15, left: 5}}
            onPress = {() => {
              if (index > 0) {
                navigator.pop()
              }
            }}>
            <Image style = {styles.back}
            source={require('./img/back.png')}/>
          </TouchableOpacity>
        )
      } else {
        return null
      }
    },
    RightButton(route, navigator, index, navState) {
      return null
    },
    Title(route, navigator, index, navState) {
      return (
        <Text style = {styles.title}>
          {route.title}
        </Text>
      )
    }
  };

  const styles = StyleSheet.create({
    navigationBar: {
      backgroundColor: '#32c850'
    },
    title: {
      paddingVertical: 15,
      color: '#FFFFFF',
      justifyContent: 'center',
      fontSize: 19
    },
  })
