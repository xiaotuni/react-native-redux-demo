import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
        <TabItem.Navigator
          tabBarOptions={{ style: { height: 40, }, tabStyle: { height: 35, paddingTop: 5 }, labelStyle: { marginBottom: -5 } }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const { name } = route;
              const iconMap = { 'Home': 'ios-home', 'Feed': 'logo-rss', 'About': 'ios-settings' };
              return <Icon name={iconMap[name] || 'ios-home'} size={size} color={color} />;
            },
          })}>
          <TabItem.Screen name="Home" component={HomeStack} />
          <TabItem.Screen name="About" component={Abouter} />
          <TabItem.Screen name="About1" component={Abouter} />
          <TabItem.Screen name="About2" component={Abouter} />
          <TabItem.Screen name="About3" component={Abouter} />
        </TabItem.Navigator>
      </NavigationContainer >
    );
  }
}

