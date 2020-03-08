import React from 'react';
import { StyleSheet, Text, View, ColorPropType } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Todos</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    height: 40,
    flexDirection: 'row',
    // paddingTop: 20,
    backgroundColor: 'coral',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
  }
})