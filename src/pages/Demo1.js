import React, { useState } from 'react';

import { View, Text, Button, StyleSheet } from 'react-native';

export default class Demo1 extends React.Component {


  render() {

    // const [test, setTest] = useState('testValue');

    return (
      <View style={styles.container} >
        <View style={styles.content}>
          <View style={styles.list}>
            <Text>Class Demo1 Page</Text>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {

  },
  content: {

  },
  list: {

  },
});
