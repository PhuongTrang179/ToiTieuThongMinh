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
import CayTrongChiTiet from "./../Components/view-cay-trong-chi-tiet.js";

export default class XacNhanThemCayTrong extends Component {
  static navigationOptions = {
    title: "Thêm cây trồng",
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      fontFamily: "MuseoSansRounded-300",
      fontWeight: "300",
      justifyContent: "space-between"
    }
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
        x.push(<CayTrongChiTiet 
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


  themCayTrong = (keycambien, keycaytrong, emailnguoidung)=>{
    const {navigation, position} = this.props;
    Alert.alert(
      'Thông báo',
      'Bạn có muốn chọn cây trồng này',
      [
        {text: 'OK', onPress: () => {
          firebaseApp.database().ref('caytrong/'+keycaytrong).on('value', function(snapshot) { 
            firebaseApp.database().ref('cambien/'+keycambien+'/caytrong').set({
              anhsangbatdau: snapshot.val().anhsangbatdau,
              anhsangketthuc: snapshot.val().anhsangketthuc,
              doambatdau: snapshot.val().doambatdau,
              doamketthuc: snapshot.val().doamketthuc,
              nhietdobatdau: snapshot.val().nhietdobatdau,
              nhietdoketthuc:snapshot.val().nhietdoketthuc,
              domaumobatdau: snapshot.val().domaumobatdau,
              domaumoketthuc: snapshot.val().domaumoketthuc,
              keycaytrong: keycaytrong,
              hinhanhcambien: snapshot.val().hinhanhcaytrong,
              ngaybatdautheodoi: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
            }).then(()=>{
              navigation.navigate('ManHinh_Home', {emailnguoidung:emailnguoidung})
            })
            .catch(function(error) {
              Alert.alert(
                'Thông báo',
                'Thêm thất bại',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            });
        });
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  render() {
    var a = this.props.navigation.state.params.keycaytrong ;
    var b = this.props.navigation.state.params.keycambien ;
    var emailnguoidung= this.props.navigation.state.params.emailnguoidung;
    return (
      <ScrollView>
        {this.layDuLieuCayTrong(a)}
        <TouchableOpacity style={css.btn}
          onPress={() => {this.themCayTrong(b,a, emailnguoidung)}}
        >
          <Text style={css.btn_text}>Chọn</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

var css = StyleSheet.create({
    btn:{margin: 8,borderRadius:10, backgroundColor: '#02b875',  justifyContent: "center", alignItems: "center"},
    btn_text:{
      padding: 5,
    }
});
