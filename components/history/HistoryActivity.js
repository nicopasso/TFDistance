import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Navigator,
  Alert,
  Text,
  ListView
} from 'react-native';

export default class HistoryActivity extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var distances = this.props.datasource
    this.state = {
      dataSource: ds.cloneWithRows(distances.datasource)
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <Text style={styles.row}>
              {rowData}
            </Text>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#FFFFFF'
  },
  row: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth:1
  }
});
