import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import * as r from './realm'

export default class App extends Component {
  testRealm = () => {
    r.insertRealmFromObject(
      { id: 3, title: 'this is a title' },
      r.standardObjectsSchema,
      r.STANDARD_OBJECT
    )
  }


  render() {
    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <Text>Welcome to React Native!</Text>
        <TouchableOpacity onPress={ this.testRealm }>
          <Text>Press Here</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
