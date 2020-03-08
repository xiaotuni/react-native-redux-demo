import React from 'react';
import { Button, View, Text } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../components/card';

export default function Details(props) {
  const { navigation, route = {} } = props;
  const { params } = route;
  const { title, rating, body } = params;
  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.textCenter}>{title}</Text>
        <Text style={globalStyles.textRight}>{rating}</Text>
        <Text >{body}</Text>
      </Card>
      <View style={globalStyles.btnFlix}>

        <Button title="go back" onPress={() => {
          navigation.goBack();
        }} />
      </View>
    </View>
  );
}