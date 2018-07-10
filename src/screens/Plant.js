import React, { Component } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Image,
	FlatList,
  Alert,
  ActivityIndicator
  } from "react-native";
  import { firebaseApp } from "./FirebaseConfig.js";
  import CayTrong from "./../Components/view-danh-sach-cay-trong.js";

export default class Plant extends Component {
  static navigationOptions = {
    title: "Cây trồng",
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      //fontFamily: "MuseoSansRounded-300",
      fontWeight: "300",
      justifyContent: "space-between"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      mang: [],
      st: false
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
      this.setState({ mang: dl, st:true });
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
      <CayTrong
        keycaytrong={item.id}
        tencaytrong={item.tencaytrong}
        anhcaytrong={item.anhcaytrong}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    return (
      <ScrollView>
        {this.state.st ? 
          <View style={css.container}>{this.DanhSachCayTrong()}</View>
          : <View style={{alignItems:"center"}} ><ActivityIndicator></ActivityIndicator></View>
        }
      </ScrollView>
    );
  }
}
var css = StyleSheet.create({
	container: {
	  flexDirection: "column"
	}
  });
  