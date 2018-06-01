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
import ViewCayTrongChiTiet from "./../Components/view-cay-trong-chi-tiet.js";

export default class CayTrongChiTiet extends Component {
  static navigationOptions = {
    title: "Chi Tiết",
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
      mang: [],
      refresh: false,
    };
  }
  
  layDuLieuCayTrong = (key)=>{
    var x = [];
    firebaseApp.database().ref('caytrong/'+key).on('value', function(snapshot) {
        x.push(<ViewCayTrongChiTiet 
                anhsang= {snapshot.val().anhsangbatdau +" - "+snapshot.val().anhsangketthuc} 
                doam= {snapshot.val().doambatdau +" - "+snapshot.val().doamketthuc} 
                nhietdo= {snapshot.val().nhietdobatdau +" - "+snapshot.val().nhietdoketthuc} 
                domaumo= {snapshot.val().domaumobatdau +" - "+snapshot.val().domaumoketthuc} 
                saubenh= {snapshot.val().cacloaisaubenh}
                bonphan= {snapshot.val().bonphan}
                gioithieu = {snapshot.val().gioithieu}
                hocaytrong = {snapshot.val().hocaytrong}
                hinhanhcaytrong = {snapshot.val().hinhanhcaytrong}
                loaicaytrong = {snapshot.val().loaicaytrong}
                nguongoccaytrong = {snapshot.val().nguongoccaytrong}
                tencaytrong={snapshot.val().tencaytrong}  
                thoigiancaytrong = {snapshot.val().thoigiancaytrong}
                />);
      });
    return  x;
  }

  render() {
    var a = this.props.navigation.state.params.keycaytrong ;
    return (
      <ScrollView>
        {this.layDuLieuCayTrong(a)}
      </ScrollView>
    );
  }
}

var css = StyleSheet.create({
    
});
