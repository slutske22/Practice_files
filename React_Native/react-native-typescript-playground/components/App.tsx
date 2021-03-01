/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [page, setPage] = useState();

  const sections = [
    { id: '0', text: 'View' },
    { id: '1', text: 'Text' },
    { id: '2', text: 'Image' },
    { id: '3', text: 'ScrollView' },
    { id: '4', text: 'ListView' },
  ];

  return (
    <FlatList
      data={sections}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <Text style={styles.row}>{item.text}</Text>
        </TouchableOpacity>
      )}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
});

export default App;
