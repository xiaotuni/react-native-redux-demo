import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import About from '../pages/Abouter';

const AboutStack = createStackNavigator();

export default () => {
  return (
    <AboutStack.Navigator screenOptions={{
      headerStyle: { height: 35 },
      headerTitleAlign: 'center',
    }}>
      <AboutStack.Screen name="About" component={About} />
    </AboutStack.Navigator>
  );
}