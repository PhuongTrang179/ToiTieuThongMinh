import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Alert,
} from "react-native";
import {firebaseApp} from './../screens/FirebaseConfig';

export default class DanhSachMayBom extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      keycambien: this.props.keycambien,
      emailnguoidung:this.props.emailnguoidung,
      dsmaybomchuahoatdong:[],
    };
  }

  componentDidMount(){
    var emailnguoidung = this.props.navigation.state.params.emailnguoidung;
    firebaseApp.database().ref(`maybom`).orderByChild('emailnguoidung').equalTo(emailnguoidung).on('value', maybom => {
        let dl =[];
        maybom.forEach(function(data) {
            if(data.val().trangthai == 0)
            {
                dl.push({
                keymaybom:data.key,
                tenmaybom:data.val().tenmaybom,
                chandieukhien: data.val().chandieukhien,
                vitri: data.val().vitri
                });
            }            
        });
        this.setState({dsmaybomchuahoatdong:dl});
    });
  }

  keyExtractor = (item) => item.id;

  themMayBom = (keymaybom, tenmaybom, chandieukhien) =>{
    var keycambien = this.state.keycambien;
    Alert.alert(
      'Thông báo',
      'Bạn có chắc chọn máy bơm này!',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          firebaseApp.database().ref('cambien/'+keycambien+'/maybom').update({
            tenmaybom: tenmaybom,
            keymaybom:keymaybom
          }).then(()=>{
            firebaseApp.database().ref('cambien/'+keycambien+'/datlich').update({
              chandieukhien: chandieukhien,
              trangthaimaybom: false
            }).then(()=>{
              firebaseApp.database().ref('maybom/'+keymaybom).update({
                trangthai: 1
              }).catch(function(error) {
                Alert.alert(
                  'Thông báo',
                  'Cập nhật trạng thái máy bơm thất bại',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
              });
            }).catch(function(error) {
              Alert.alert(
                'Thông báo',
                'Cập nhật chân điểu khiển thất bại',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
            });
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
        }},
      ],
      { cancelable: false }
    )
  }

  renderItem = ({item}) => {
    return(
      <TouchableOpacity onPress={ (event)=>this.themMayBom(item.keymaybom, item.tenmaybom, item.chandieukhien)}>
      <View style={css.row} >
            <View style={{flex:0.9}} >
              <Text>{item.tenmaybom}</Text>
              <Text style={{fontSize:10, fontStyle:'italic'}}>(Vị trí: {item.vitri})</Text>
            </View>
            <View style={{flex:0.1,  alignItems: 'flex-end',}}>
              <Image source={require('./../icons/plus.png')} style={css.anh_thao_tac}/>
            </View>
      </View>
      </TouchableOpacity>
    );
  }


  render() {
    return (
      <View style={css.container}>
        <View style={{flexDirection: 'row',justifyContent:'center', alignItems: 'center', padding:10, }} >
          <Text style={{color:'red', fontSize:10}} >{ this.state.dsmaybomchuahoatdong.length == 0 ? 'Máy bơm không có sẵn' : 'Vui lòng chọn máy bơm để thực hiện đặt lịch!'}</Text>
        </View>        
         <FlatList
            data={this.state.dsmaybomchuahoatdong}
            extraData={this.state}
            keyExtractor = {this.keyExtractor}
            renderItem={this.renderItem.bind(this)}
        />
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
    alignItems:'center'
 },
 anh_thao_tac:{ 
  width: 15,
  height: 15, 
  padding:0, 
  margin:3
},
});
