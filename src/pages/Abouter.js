import React from 'react';
import { View, Text, Button } from 'react-native';
import { globalStyles } from '../styles/global';
import { connect } from 'react-redux';
import Utility from '../common/Utility';
import { ClassifyService } from '../services';

// export default function Abouter() {
//   return (
//     <View style={globalStyles.container}>
//       <Text>About</Text>
//     </View>
//   );
// }
@connect((state) => ({ Common: state.Common }))
export default class Abouter extends React.Component {
  constructor(props) {
    super(props);
  }

  async HandlerGetApi() {
    // Utility.onApiGet({ apiInfo:ApiInfo '', stateName: 'aaaaaa', options: { params: { page: 1, size: 100 } } })
    const info = await ClassifyService.List({ page: 1, size: 1000 })
    console.log(info);
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <Text>About</Text>
        <Button title="click 查看内容" onPress={() => {
          console.log(this.props);
        }} />
        <Button title="调用接口" onPress={() => {
          this.HandlerGetApi();
        }} />
      </View>
    );
  }
}