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

export default class DanhSachCayTrong extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("ManHinh_CayTrongChiTiet", {
                keycaytrong:this.props.keycaytrong,
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
            <Image source={{ uri: this.props.anhcaytrong }} style={css.anh} />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text> {this.props.tencaytrong}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

var css = StyleSheet.create({
  anh: {
    width: 40,
    height: 40,
    borderRadius: 50
  }
});
