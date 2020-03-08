import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeStack from './HomeStack';
import AboutStack from './AboutStack';
import { connect } from 'react-redux';
import Utility from '../common/Utility';

const RootDrawer = createDrawerNavigator();
// @connect((state) => ({ ...state }))
// export default () => {
//   return (
//     <NavigationContainer>
//       <RootDrawer.Navigator screenOptions={{
//         headerStyle: { height: 35 },
//         headerTitleAlign: 'center',
//       }}>
//         <RootDrawer.Screen name="HomeStack" component={HomeStack} />
//         <RootDrawer.Screen name="AboutStack" component={AboutStack} />
//       </RootDrawer.Navigator>
//     </NavigationContainer>
//   )
// }


@connect((state) => ({ ...state }))
export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props);

  }
  UNSAFE_componentWillMount() {

    this.init(this.props);
  }

  init(props) {
    try {
      console.log(this.props);
      Utility.SetContent(Utility.ConstItem.KeyDispatch, props.dispatch);
    } catch (ex) {
      console.log(ex);
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <NavigationContainer>
        <RootDrawer.Navigator screenOptions={{
          headerStyle: { height: 35 },
          headerTitleAlign: 'center',
        }}>
          <RootDrawer.Screen name="HomeStack" component={HomeStack} />
          <RootDrawer.Screen name="AboutStack" component={AboutStack} />
        </RootDrawer.Navigator>
      </NavigationContainer>
    );
  }
}