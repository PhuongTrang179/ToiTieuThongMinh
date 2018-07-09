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
    title: "Thay đổi máy bơm",
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      //fontFamily: "MuseoSansRounded-300",
      fontWeight: "300",
      justifyContent: "space-between"
    },
    headerRight: (
      <View></View>
    )
  });

  
  constructor(props) {
    super(props);
    this.state = {
        keymaybom: this.props.navigation.state.params.keymaybom,
        keycambien: this.props.navigation.state.params.keycambien,
        dsmaybomchuahoatdong:[],
    };
  }
  componentDidMount() {
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
              }).then(()=>{
                firebaseApp.database().ref('maybom/'+this.state.keymaybom).update({
                  trangthai: 0
                }).then(()=>{
                    this.props.navigation.goBack();
                });
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
            <View style={{flex:0.9, justifyContent:'center',}} >
              <Text>{item.tenmaybom}</Text>
              <Text style={{fontSize:10, fontStyle:'italic'}}>(Vị trí: {item.vitri})</Text>
            </View>
            <View style={{flex:0.1, justifyContent:'center', alignItems: 'flex-end',}}>
              <Image source={require('./../icons/plus.png')} style={{height:15, width:15}}/>
            </View>
      </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={css.container}>
        <View>
          <FlatList
              data={this.state.dsmaybomchuahoatdong}
              extraData={this.state}
              keyExtractor = {this.keyExtractor}
              renderItem={this.renderItem.bind(this)}
          />
        </View>
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
});
