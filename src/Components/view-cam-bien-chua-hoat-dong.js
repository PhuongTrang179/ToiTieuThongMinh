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

export default class CamBienChuaHoatDong extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  render() {
    return (
      <TouchableOpacity
        onPress={(key) => {
          this.props.navigation.navigate("ManHinh_ThemCayTrong", {keycambien:this.props.keycambien,emailnguoidung:this.props.emailnguoidung});
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderColor: "#E0E0E0"
          }}
        >
          <View style={{ paddingRight: 5, paddingLeft: 5 }}>
            <Image source={require("./../icons/xiaomi.jpg")} style={css.anh} />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>{this.props.tencambien}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

var css = StyleSheet.create({
  anh: {
    width: 50,
    height: 50,
    borderRadius: 50
  }
});
