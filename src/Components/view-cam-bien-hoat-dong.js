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

export default class CamBienHoatDong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  kiemtra=(dulieu)=>{
    if(dulieu === 'good')
      return (<Text style={css.good}>{dulieu}</Text>);
    if (dulieu === 'low')
      return (<Text style={css.low}>{dulieu}</Text>);
    if (dulieu === 'high')
      return (<Text style={css.high}>{dulieu}</Text>);
    else 
      return (<Text>{dulieu}</Text>);
  }


  render() {
    var doam = this.props.doam;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("ManHinh_Detail", {keycambien:this.props.keycambien});
        }}>
        <View style={css.subcontainer}>
          <View style={css.subleft}>
            <Image source={{ uri: this.props.hinhanhcambien }} style={css.anh} />
          </View>
          <View style={css.submid}>
            <View style={{ flex: 0.4,}}>
              <Text style={{ fontSize: 12 }}>{this.props.tencambien}</Text>
            </View>
            <View style={{ flex: 0.6, flexDirection: "column" }}>
              <View style={css.row_flex}>
                <View style={css.row_flex}>
                  <Image
                    source={require("./../icons/doam.png")}
                    style={css.icon}
                  />
                  <View style={css.col_flex}>
                    <Text style={css.giatri}>Độ ẩm đất: {this.kiemtra(this.props.doam)}
                    </Text>
                  </View>
                </View>
                <View style={css.row_flex}>
                  <Image
                    source={require("./../icons/nhietdo.png")}
                    style={css.icon}
                  />
                  <View style={css.col_flex}>
                    <Text style={css.giatri}>Nhiệt độ: {this.kiemtra(this.props.nhietdo)}</Text>
                  </View>
                </View>
              </View>
              <View style={css.row_flex}>
                <View style={css.row_flex}>
                  <Image
                    source={require("./../icons/anhsang.png")}
                    style={css.icon}
                  />
                  <View style={css.col_flex}>
                    <Text style={css.giatri}>Ánh sáng: {this.kiemtra(this.props.anhsang)}</Text>
                  </View>
                </View>
                <View style={css.row_flex}>
                  <Image
                    source={require("./../icons/dat.png")}
                    style={css.icon}
                  />
                  <View style={css.col_flex}>
                    <Text style={css.giatri}>Độ màu mỡ: {this.kiemtra(this.props.domaumo)}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

var css = StyleSheet.create({
  subcontainer: {
    flex: 0,
    flexGrow: 1,
    flexDirection: "row",
    height: 60,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0"
  },
  subleft: {
    flex: 2 / 12,
   
    justifyContent: "center",
    alignItems: "center"
  },
  submid: {
    flex: 9 / 12,
    flexDirection: "column",
  },
  anh: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
    justifyContent: "center"
  },
  giatri: {
    fontSize: 10,
    justifyContent: "center"
  },
  trangthai: {
    width: 60,
    height: 2,
    marginTop: 4
  },
  icon_chitiet: {
    width: 15,
    height: 15
  },
  row_flex: {
    flex: 0.5, 
    flexDirection: "row",
  },
  col_flex:{
    flexDirection: "column",
  },
  good:{
    color:'#00c300',
  },
  high:{
    color:'#ff3300',
  },
  low:{
    color:'#af0606',
  }
});
