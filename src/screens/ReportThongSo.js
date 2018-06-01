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

export default class ReportThongSo extends Component {
  static navigationOptions = {
    title: "Cài đặt",
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      fontFamily: "MuseoSansRounded-300",
      fontWeight: "300",
      justifyContent: "space-between"
    },
    headerRight: (<View></View>)
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  
  render() {
    return (
      <Text>Report thông số</Text>
    );
  }
}

var css = StyleSheet.create({
    
});
