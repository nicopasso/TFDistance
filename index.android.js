import React, { Component } from 'react'
import {
  AppRegistry,
  View
} from 'react-native'

import Router from './components/Router'

class TaxFixCodeChallenge extends Component {
  render() {
    return (
      <Router />
    )
  }
}
AppRegistry.registerComponent('TaxFixCodeChallenge', () => TaxFixCodeChallenge);
