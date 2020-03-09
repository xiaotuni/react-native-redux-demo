import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from '../pages/Home';
import Abouter from '../pages/Abouter';
import HomeStack from './HomeStack';
import Icon from 'react-native-vector-icons/Ionicons';

const TabItem = createBottomTabNavigator();

export default class TabItemNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <TabItem.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const { name } = route;
            const iconMap = { 'Home': 'ios-home', 'Feed': 'logo-rss', 'About': 'ios-settings' };
            return <Icon name={iconMap[name] || 'ios-home'} size={size} color={color} />;
          },
        })}>
          <TabItem.Screen name="Home" component={HomeStack} />
          <TabItem.Screen name="About" component={Abouter} />
        </TabItem.Navigator>
      </NavigationContainer>
    );
  }
}

