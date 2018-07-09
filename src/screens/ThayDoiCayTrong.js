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

export default class ThayDoiCayTrong extends Component {
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
      refresh: false,
      keycambien: this.props.navigation.state.params.keycambien,
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

  DanhSachCayTrong() {
    if (this.state.mang.length > 0) {
      return (
          <View style={{ backgroundColor: "white" }}>
            <FlatList
              data={this.state.mang}
              extraData={this.state}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItemCayTrong.bind(this)}
            />
          </View>
      );
    }
    return null;
  }

  renderItemCayTrong = ({ item }) => {
    return (
      <TouchableOpacity
         onPress={() => {
          this.props.navigation.navigate("ManHinh_XacNhanThayDoiCayTrong", {
            keycaytrong:item.id,
            keycambien:this.state.keycambien,
            
            });
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 5,
            borderBottomWidth: 1,
            borderColor: "#E0E0E0"
          }}
        >
          <View style={{ paddingRight: 5, paddingLeft: 5 }}>
            <Image source={{ uri: item.anhcaytrong }} style={css.anh} />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text> {item.tencaytrong}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
  },
  anh: {
    width: 40,
    height: 40,
    borderRadius: 50
  }
});
