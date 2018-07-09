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
  Switch,
  AsyncStorage
} from "react-native";
import { firebaseApp } from "./FirebaseConfig.js";
import CamBienCoMayBom from "./../Components/view-cam-bien-co-may-bom.js";
import DanhSachMayBom from "./../Components/view-may-bom-chua-hoat-dong.js";

export default class DatLichTuoi extends Component {
  static navigationOptions = {
    title: "Lịch tưới",
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
      dulieumaybom: [],
      keycambien: this.props.navigation.state.params.keycambien,
      emailnguoidung:this.props.navigation.state.params.emailnguoidung,
      trangthaimaybom: false,
    };
  }

  componentDidMount(){
    var key = this.props.navigation.state.params.keycambien;
    firebaseApp.database().ref(`cambien/`+key).on('value', snapshot => {
      if(snapshot.val().maybom == null)
      {
        tt=false;
      }
      else{
        tt=true;
      }
      this.setState({trangthaimaybom:tt});
    });
  }

  render() {
    return (
      <View style={css.container}>
          {this.state.trangthaimaybom == true ? 
          <CamBienCoMayBom keycambien={this.state.keycambien} navigation={this.props.navigation} emailnguoidung={this.state.emailnguoidung}/> : 
          <DanhSachMayBom navigation={this.props.navigation}  keycambien={this.state.keycambien} emailnguoidung={this.state.emailnguoidung}/>}
      </View>
    );
  }
}

var css = StyleSheet.create({
  container:{
      flex: 1,
      flexDirection: 'column',
   },
   
});
