import React, { useState } from 'react';
import { StyleSheet, Button, View, Text, BackHandler } from 'react-native';
import { globalStyles } from '../styles/global';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../components/card';
import { connect } from 'react-redux';
import { ClassifyService, Utility } from '../services';

@connect((state) => ({ Common: state.Common }))

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lastBackPressed: false, current: true };
  }

  UNSAFE_componentWillMount() {
    this.Init();
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  async onBackPress() {
    // const { dispatch } = this.props;
    console.log(this.props);
    console.log('-----------1--------');
    const isExits = await Utility.Confirm({ Msg: '您真的要退出吗？' });
    if (isExits) {
      return false;
    }
  }

  Init() {
    this.state.reviews = [
      { key: '1', title: '这是标题一了', rating: 5, body: 'lorem ipsum', },
      { key: '2', title: '这是什么东西呢', rating: 5, body: 'lorem ipsum', },
      { key: '3', title: '看年哈吧在 的', rating: 5, body: 'lorem ipsum', },
      { key: '4', title: '天天了好的了', rating: 5, body: 'lorem ipsum', },
      { key: '5', title: '哈哈是不是的呀', rating: 5, body: 'lorem ipsum', },
    ];
  }

  render() {

    const { navigation } = this.props;
    const { reviews } = this.state;

    return (
      <View style={globalStyles.container}>

        <FlatList data={reviews} keyExtractor={(item) => item.key} renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { navigation.push('Details', { ...item }); }} >
            <Card>
              <Text style={globalStyles.titleText} >{item.title}</Text>
            </Card>
          </TouchableOpacity>)} />

        <View style={styles.btns}>
          <View style={styles.btn}>
            <Button title="日志" onPress={() => {
              console.log(this.props);
            }} />
          </View>
          <View style={styles.btn}>
            <Button title="api" onPress={() => {
              ClassifyService.All({ page: 1, size: 100 });
            }} />
          </View>
          <View style={styles.btn}>
            <Button title="go to details" onPress={() => {
              navigation.push('Details', { title: '详情标题了' });
            }} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btns: {
    flexDirection: "row",
  },
  btn: {
    margin: 5,
    paddingHorizontal: 10,
  }
});

// export default function Home(props) {
//   const { navigation } = props;
//   const [reviews, setReviews] = useState([
//     { key: '1', title: '这是标题一了', rating: 5, body: 'lorem ipsum', },
//     { key: '2', title: '这是什么东西呢', rating: 5, body: 'lorem ipsum', },
//     { key: '3', title: '看年哈吧在 的', rating: 5, body: 'lorem ipsum', },
//     { key: '4', title: '天天了好的了', rating: 5, body: 'lorem ipsum', },
//     { key: '5', title: '哈哈是不是的呀', rating: 5, body: 'lorem ipsum', },
//   ]);

//   return (
//     <View style={globalStyles.container}>

//       <FlatList data={reviews} keyExtractor={(item) => item.key} renderItem={({ item }) => (
//         <TouchableOpacity onPress={() => { navigation.push('Details', { ...item }); }} >
//           <Card>
//             <Text style={globalStyles.titleText} >{item.title}</Text>
//           </Card>
//         </TouchableOpacity>)} />

//       <Button title="go to details" onPress={() => {
//         navigation.push('Details', { title: '详情标题了' });
//       }} />
//     </View>
//   );
// }