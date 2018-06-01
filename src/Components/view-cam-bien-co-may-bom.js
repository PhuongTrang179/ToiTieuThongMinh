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
  Switch
} from "react-native";
import {firebaseApp} from './../screens/FirebaseConfig';

export default class CamBienCoMayBom extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      mang: [],
      kieutuoi:'',
      keycambien: this.props.keycambien,
      tenmaybom:'',
      keymaybom:'',
      trangthaimaybom:false,
    };
  }

  _handleToggleSwitch = () => {
    var key = this.state.keycambien;
    firebaseApp.database().ref(`cambien/`+key+'/datlich').update({
      trangthai: !this.state.switchValue,
      trangthaimaybom: false
    }, function(error) {
      if (error) {
        Alert.alert(
          'Thông báo',
          'lỗi',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      } else {
        
      }
    });
};

_switchTrangThaiMayBom = () => {
  var key = this.state.keycambien;
  firebaseApp.database().ref(`cambien/`+key+'/datlich').update({
    trangthaimaybom: !this.state.trangthaimaybom,
  }, function(error) {
    if (error) {
      Alert.alert(
        'Thông báo',
        'lỗi',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    } else {
      
    }
  });
};

  kieuTuoi = (bien) =>{
    if(bien == 'auto'){
      return 'Tự động';
    }
    if(bien == 'custom')
    {
      return 'Tùy chỉnh';
    }
    else return 'Thủ công';
  }

  renderKieuTuoi = () =>{
    var x = [];
    if(this.state.switchValue)
    {
      x.push(
        <View>
        <TouchableOpacity
            onPress={() => {
            this.props.navigation.navigate("ManHinh_DatLichTuoiChiTiet", {keycambien:this.state.keycambien} );
            }}>
        <View  style={{flexDirection: 'row', backgroundColor:'white', padding:15, height:40, justifyContent:'center',}}>
          <View style={{flex:0.7,  justifyContent: 'center',}} >
            <Text>Kiểu tưới</Text>
          </View>
          <View style={{flex:0.3, justifyContent: 'center', alignItems: 'flex-end',}} >
            <View  style={{flexDirection: 'row' }}>
              <View style={{justifyContent: 'center', alignItems:'center'}}>
                <Text>{this.kieuTuoi(this.state.kieutuoi)}</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems:'center'}}>
                <Image source={require('./../icons/right-arrow.png')} style={css.anh_thao_tac}/>
              </View>
            </View>
          </View>
        </View>       
        </TouchableOpacity>
          { this.state.kieutuoi == 'handmade' ? 
            <View style={{flexDirection: 'row', backgroundColor:'white', padding:15, height:40, justifyContent:'center',borderTopWidth:0.5, borderColor:'#d1ccc0',}}>
              <View style={{flex:0.7,  justifyContent: 'center',}} >
                <Text>Bật/tắt máy bơm thủ công</Text>
              </View>
              <View style={{flex:0.3, justifyContent: 'center', alignItems: 'flex-end',}} >
                <Switch 
                  onValueChange={this._switchTrangThaiMayBom}
                  value={this.state.trangthaimaybom}
                />
              </View>
            </View>  
            : null   
          }  
        </View>
      );
    }
    return x;
  }

  componentDidMount(){
    var key = this.props.keycambien;
    firebaseApp.database().ref(`cambien/`+key).on('value', dl => {
      if(dl.val().maybom != null)
      {
        if(dl.val().datlich == null)
        {
          firebaseApp.database().ref('cambien/'+key+'/datlich').set({
            kieutuoi: 'auto',
            trangthai: false,
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
        }
        else{
          firebaseApp.database().ref(`cambien/`+key+'/datlich').on('value', data => {
              this.setState({ switchValue:data.val().trangthai, 
                kieutuoi: data.val().kieutuoi,
                tenmaybom: dl.val().maybom.tenmaybom, 
                keymaybom:dl.val().maybom.keymaybom,
                trangthaimaybom: data.val().trangthaimaybom
              });
            }); 
        }     
      }        
    });
  }

  render() {
    return (
      <View style={css.container}>
        <TouchableOpacity>
        <View style={css.row}>
          <View style={{flex:0.8, justifyContent: 'center', }} >
            <Text>{this.state.tenmaybom}</Text>
            <Text style={{fontSize:9,fontStyle:'italic'}}>Trạng thái máy bơm: <Text style={{fontWeight:'bold'}}>{this.state.trangthaimaybom == true ? 'Bật' : 'Tắt'}</Text></Text>
          </View>
          <View style={{flex:0.2, justifyContent: 'center', alignItems:'flex-end'}} >
              <Image source={require('./../icons/right-arrow.png')} style={{width:15, height:15,}}/>
          </View>
        </View>  
        </TouchableOpacity>
        <View style={css.row}>
          <View style={{flex:0.7, justifyContent: 'center', }} ><Text>Đặt lịch tưới</Text></View>
          <View style={{flex:0.3, justifyContent: 'center', }} >
            <Switch 
              onValueChange={this._handleToggleSwitch}
              value={this.state.switchValue}
            />
          </View>
        </View>  
          {this.renderKieuTuoi()}
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
      padding:15, 
      marginBottom:10, 
      height:40,
      justifyContent:'center',
   },
   anh_thao_tac:{ 
      width: 15,
      height: 15, 
      padding:0, 
      margin:3
    },
});
