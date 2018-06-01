import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

export default class CayTrongChiTiet extends Component {
  render() {
    return (
      <View style={css.container}>
        <Image
          resizeMode={"cover"}
          style={css.anh}
          source={{ uri: this.props.hinhanhcaytrong }}
        />
        <View style={css.tencaytrong}>
          <View style={{}}>
            <Text>{this.props.tencaytrong}</Text>
          </View>
        </View>
        <View style={css.thongtincaytrong}>
          <View style={css.subleft}>
            <Text>Họ cây trồng</Text>
          </View>
          <View style={css.subright}>
            <Text>{this.props.hocaytrong}</Text>
          </View>
        </View>
        <View style={css.thongtincaytrong}>
          <View style={css.subleft}>
            <Text>Nguồn gốc</Text>
          </View>
          <View style={css.subright}>
            <Text>{this.props.nguongoccaytrong}</Text>
          </View>
        </View>
        <View style={css.thongtincaytrong}>
          <View style={css.subleft}>
            <Text>Loại cây trồng</Text>
          </View>
          <View style={css.subright}>
            <Text>{this.props.loaicaytrong == 1 ? "Cây lâu năm" : "Cây ngắn ngày"}</Text>
          </View>
        </View>
        <View style={css.thongtincaytrong}>
          <View style={css.subleft}>
            <Text>Mô tả</Text>
          </View>
          <View style={css.subright}>
            <Text>{this.props.gioithieu}</Text>
          </View>
        </View>
        <View style={css.thongtincaytrong}>
          <View style={css.subleft}>
            <Text>Thời gian trồng</Text>
          </View>
          <View style={css.subright}>
            <Text>{this.props.thoigiancaytrong}</Text>
          </View>
        </View>
        <View style={css.thongtincaytrong}>
          <View style={css.subleft}>
            <Text>Ánh sáng</Text>
          </View>
          <View style={css.subright}>
            <Text>{this.props.anhsang} (lux)</Text>
          </View>
        </View>
        <View style={css.thongtincaytrong}>
          <View style={css.subleft}>
            <Text>Độ ẩm</Text>
          </View>
          <View style={css.subright}>
            <Text>{this.props.doam} (%)</Text>
          </View>
        </View>
        <View style={css.thongtincaytrong}>
          <View style={css.subleft}>
            <Text>Nhiệt độ</Text>
          </View>
          <View style={css.subright}>
            <Text>{this.props.nhietdo} (°C)</Text>
          </View>
        </View>
        <View style={css.thongtincaytrong}>
          <View style={css.subleft}>
            <Text>EC</Text>
          </View>
          <View style={css.subright}>
            <Text>{this.props.domaumo} (µS/cm)</Text>
          </View>
        </View>
        <View style={css.thongtincaytrong}>
          <View style={css.subleft}>
            <Text>Sâu bệnh</Text>
          </View>
          <View style={css.subright}>
            <Text>{this.props.saubenh}</Text>
          </View>
        </View>
        <View style={css.thongtincaytrong}>
          <View style={css.subleft}>
            <Text>Bón phân</Text>
          </View>
          <View style={css.subright}>
            <Text>{this.props.bonphan}</Text>
          </View>
        </View>
      </View>
    );
  }
}

var css = StyleSheet.create({
    container:{
        flex:1,
    },
  anh: {
    width: "100%",
    height: 250,
  },
  tencaytrong: {
    flexDirection: "row",
    borderColor: "gray",
    borderBottomWidth: 0.5,
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  thongtincaytrong: {
    flexDirection: "row",
    borderColor: "gray",
    borderBottomWidth: 0.5,
    padding: 5,
    marginLeft: 5,
    marginRight: 5
  },
  subleft: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  subright: {
    flex: 0.7,
    borderColor: "gray",
    borderLeftWidth: 0.5,
    paddingLeft: 5,
    marginLeft: 5,
    marginRight: 5
  }
});
