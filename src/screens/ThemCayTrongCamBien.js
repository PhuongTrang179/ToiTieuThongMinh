import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Alert
} from "react-native";
import { firebaseApp } from "./FirebaseConfig.js";
import CayTrong from "./../Components/view-danh-sach-chon-cay-trong.js";

export default class ThemCayTrong extends Component {
  static navigationOptions = {
    title: "Chọn cây trồng",
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      //fontFamily: "MuseoSansRounded-300",
      fontWeight: "300",
      justifyContent: "space-between"
    },
    headerRight: (<View></View>)
  };

  constructor(props) {
    super(props);
    this.state = {
      mang: [],
      refresh: false
    };
  }

  componentDidMount() {
    firebaseApp
      .database()
      .ref(`caytrong`)
      .on("value", snapshot => {
        let dl = [];
        snapshot.forEach(function(data) {
          dl.push({
            id: data.key,
            tencaytrong: data.val().tencaytrong,
            anhcaytrong: data.val().hinhanhcaytrong
          });
        });
        this.setState({ mang: dl });
      });
  }

  keyExtractor = item => item.id;
  a = () => {
    this.setState({
      refresh: true
    });

    firebaseApp
      .database()
      .ref(`caytrong`)
      .on("value", snapshot => {
        let dl = [];
        snapshot.forEach(function(data) {
          dl.push({
            id: data.key,
            tencaytrong: data.val().tencaytrong,
            anhcaytrong: data.val().hinhanhcaytrong
          });
        });
        this.setState({
          mang: dl,
          refresh: false
        });
      });
  };

  DanhSachCayTrong() {
    if (this.state.mang.length > 0) {
      return (
        <View>
          <View style={{ paddingLeft: 5, margin: 5 }}>
            <Text>Danh sách cây trồng</Text>
          </View>
          <View style={{ backgroundColor: "white" }}>
            <FlatList
              refreshing={this.state.refresh}
              onRefresh={() => this.a}
              data={this.state.mang}
              extraData={this.state}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItemCayTrong.bind(this)}
            />
          </View>
        </View>
      );
    }
    return null;
  }

  renderItemCayTrong = ({ item }) => {
    return (
      <CayTrong
        keycambien={this.props.navigation.state.params.keycambien}
        keycaytrong={item.id}
        tencaytrong={item.tencaytrong}
        anhcaytrong={item.anhcaytrong}
        navigation={this.props.navigation}
        emailnguoidung={this.props.navigation.state.params.emailnguoidung}
      />
    );
  };

  render() {
    return (
      <ScrollView>
        <View style={css.container}>{this.DanhSachCayTrong()}</View>
      </ScrollView>
    );
  }
}

var css = StyleSheet.create({
  container: {
    flexDirection: "column"
  }
});
