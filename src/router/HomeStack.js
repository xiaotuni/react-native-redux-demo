import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import HomeScreen from '../pages/Home';
import DetailsScreen from '../pages/Details';
import { Button } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const HomeStack = createStackNavigator();

export default (props) => {

  const { navigation, route } = props;
  if (route.state) {
    setTimeout(() => {
      navigation.setOptions({ tabBarVisible: route.state.index > 0 ? false : true }) // Tab 隐藏
    }, 300);
  }

  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{
      headerStyle: { height: 35 },
      headerTitleAlign: 'center',
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen}
        options={
          (args) => {
            const { navigation } = args;
            return {
              // headerLeft: () => (<Button title="编辑" onPress={() => navigation.openDrawer()} />),
              headerLeft: () => (<Icon name="ios-menu" size={28} onPress={() => navigation.openDrawer && navigation.openDrawer()} />),
            };
          }} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>

  );
}