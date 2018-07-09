import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  Alert
} from "react-native";
import { firebaseApp } from "./FirebaseConfig.js";

export default class ReportThongSo extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Máy bơm",
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      //fontFamily: "MuseoSansRounded-300",
      fontWeight: "300",
      justifyContent: "space-between"
    },
    headerRight: (
      <View style={{marginRight:20}}>
        {navigation.state.params.editing == true ? 
        <TouchableOpacity onPress={() => navigation.state.params.handleUpdate()} ><Text style={{color:'#00b894', fontSize:17,}} >Lưu</Text></TouchableOpacity>
        : <Text style={{fontSize:16}}>Lưu</Text>}
      </View>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      keymaybom: this.props.navigation.state.params.keymaybom,
      keycambien: this.props.navigation.state.params.keycambien,
      tenmaybom_default: '',
      vitri_default:'',
      tenmaybom:'',
      vitri:'',
      emailnguoidung:this.props.navigation.state.params.emailnguoidung,
    };
    this.props.navigation.state.params.editing = false;
    this.props.navigation.setParams({ handleUpdate: this.updateMayBom.bind(this) });
  }

  componentDidMount() {
    var key= this.props.navigation.state.params.keymaybom;
    firebaseApp.database().ref(`maybom/`+key).on('value', data => {
      this.setState({
        tenmaybom_default:data.val().tenmaybom,
        vitri_default: data.val().vitri,
        tenmaybom:data.val().tenmaybom,
        vitri: data.val().vitri,
      });
    });    
  }

  handleTenMayBom (value ) {
      this.setState({tenmaybom: value.toString()});
      if(value.toString() == this.state.tenmaybom_default  && this.state.vitri_default == this.state.vitri){
        this.props.navigation.setParams({ editing: false});
      }
      else this.props.navigation.setParams({ editing: true}); 
      
  }

  handleViTri (value ) {
    this.setState({vitri: value.toString()});
   
    if(value.toString() == this.state.vitri_default && this.state.tenmaybom_default == this.state.tenmaybom ){
      this.props.navigation.setParams({ editing: false});
    }
    else this.props.navigation.setParams({ editing: true}); 
  }

  updateMayBom () {
    var keycambien = this.props.navigation.state.params.keycambien;
    firebaseApp.database().ref('cambien/'+keycambien+'/maybom').update({
      tenmaybom: this.state.tenmaybom,
    }).then(()=>{
      firebaseApp.database().ref('maybom/'+this.state.keymaybom).update({
        tenmaybom: this.state.tenmaybom,
        vitri: this.state.vitri,
      }).then(()=>{
        this.props.navigation.goBack();
      });
    }).catch(function(error) {
      Alert.alert(
        'Thông báo',
        'Cập nhật thông tin máy bơm thất bại',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    });
  }

  // boChonMayBom = ()=>{
  //   var keycambien = this.props.navigation.state.params.keycambien;
  //   firebaseApp.database().ref('maybom/'+this.state.keymaybom).update({
  //     trangthai: 0
  //   }).then(()=>{
  //     firebaseApp.database().ref('cambien/'+keycambien+'/maybom').remove().then(()=>{
  //       firebaseApp.database().ref('cambien/'+keycambien+'/datlich').remove().then(()=>{
  //         this.props.navigation.goBack('ManHinh_Detail');
  //       });
  //     });
  //   });
  // }

  render() {
    return (
      <View style={css.container}>
        <View style={css.row} >
          <View style={{flex:0.2, justifyContent: 'center',}} >
            <Text>Tên:</Text>
          </View>
          <View style={{flex:0.8, justifyContent: 'center',}} >
            <TextInput style={css.textinput} placeholder='Tên máy bơm' underlineColorAndroid='#b2bec3'
                onChangeText = {(value)=>this.handleTenMayBom(value)} value={this.state.tenmaybom}
                      />
          </View>          
        </View>
        <View style={css.row}>
          <View style={{flex:0.2, justifyContent: 'center',}} >
              <Text>Vị trí:</Text>
          </View>
          <View style={{flex:0.8, justifyContent: 'center',}} >
            <TextInput style={css.textinput}  placeholder='vị trí' underlineColorAndroid='#b2bec3'
                onChangeText={(vitri) => this.handleViTri(vitri)} value={this.state.vitri}
              />
          </View>
        </View>
        <TouchableOpacity
           onPress={() => {
							this.props.navigation.navigate("ManHinh_XacNhanThayDoiMayBom", {navigation:this.props.navigation, keymaybom: this.state.keymaybom, keycambien:this.state.keycambien, emailnguoidung: this.state.emailnguoidung});
							}}
          >
          <View style={css.row}>
            <View style={{flex:0.8, justifyContent: 'center',}} >
                <Text>Thay đổi máy bơm</Text>
            </View>
            <View style={{flex:0.2, justifyContent: 'center', alignItems:'flex-end'}} >
                <Image source={require('./../icons/right-arrow.png')} style={{width:15, height:15,}}/>
            </View>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity style={css.btn} onPress={() => {this.boChonMayBom()}}>
              <Text style={css.btn_text}>Bỏ chọn máy bơm</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

var css = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
  },
  row:{
      flexDirection: 'row', 
      backgroundColor:'white', 
      paddingLeft:15,
      paddingRight:15,
      height:55,
      marginBottom:10, 
      justifyContent:'center',
  },
  textinput:{
    paddingLeft:10,
    paddingRight:10,
  },
  btn:{margin: 8,borderRadius:10, backgroundColor: 'red',  justifyContent: "center", alignItems: "center"},
  btn_text:{
    padding: 5,
  }
});
