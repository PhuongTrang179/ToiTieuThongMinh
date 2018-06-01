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
  TouchableWithoutFeedback
} from "react-native";
import { firebaseApp } from "./FirebaseConfig.js";

export default class DatLichTuoiChiTiet extends Component {
  static navigationOptions = {
    title: "Chi tiết",
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      fontFamily: "MuseoSansRounded-300",
      fontWeight: "300",
      justifyContent: "space-between"
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      kieutuoi:'',
      keycambien: this.props.navigation.state.params.keycambien,
    };
  }

  componentDidMount(){
    var key = this.props.navigation.state.params.keycambien;
      firebaseApp.database().ref(`cambien/`+key+'/datlich').on('value', data => {
        this.setState({kieutuoi: data.val().kieutuoi});
      });
  }

  _selectedItem = (kieutuoi) => {
    var key = this.state.keycambien;
    firebaseApp.database().ref(`cambien/`+key+'/datlich').update({
      kieutuoi: kieutuoi,
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
      }
    });
    if(kieutuoi == 'custom')
    {
      this.props.navigation.navigate("ManHinh_TuyChinhGioTuoi", {keycambien:this.state.keycambien});
    }
    else{
      this.props.navigation.goBack();
    }
          
  };

  kieuTuoi = (bien) =>{
    if(bien == 'auto'){
    return (<Text>Tự động</Text>);
    }
    if(bien == 'custom')
    {
      return (
        <View  style={{flexDirection: 'row' }}>
            <View style={{flex:0.9, justifyContent: 'center',}}>
              <Text>Tùy chỉnh</Text>
            </View>
            <View style={{flex:0.1, justifyContent: 'center', alignItems: 'flex-end',}}>
              <Image source={require('./../icons/right-arrow.png')} style={css.anh_thao_tac}/>
            </View>
        </View>
      );
    }
    else return (<Text>Thủ công</Text>);
  }

  renderItem = ({item}) => {
    var x = [];
    if(item.key == this.state.kieutuoi)
    {
     x.push(<TouchableOpacity onPress={(event)=>this._selectedItem(item.key)}>
              <View style={css.row} >
                <View style={{flex:0.1, justifyContent: 'center', }} >
                  <Image source={require('./../icons/checked.png')} style={css.anh_thao_tac}/>
                </View>
                <View style={{flex:0.9, justifyContent: 'center', }} >
                  {this.kieuTuoi(item.key)}
                </View>
              </View>
            </TouchableOpacity>);
    }
    else{
      x.push(<TouchableOpacity onPress={(event)=>this._selectedItem(item.key)}>
              <View  style={css.row}>
                <View style={{flex:0.1, justifyContent: 'center', }} >
                </View>
                <View style={{flex:0.9, justifyContent: 'center', }} >
                  {this.kieuTuoi(item.key)}
                </View>
              </View>
              </TouchableOpacity>);
    }
    return x;
  }
  keyExtractor = (item) => item.id;


  render() {
    return (
      <View style={css.container}>
          <FlatList
            keyExtractor = {this.keyExtractor}
            data={[{key: 'handmade'},{key: 'auto'}, {key: 'custom'}]}
            renderItem={this.renderItem}
          />
      </View>
    );
  }
}

var css = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row:{
    flexDirection: 'row', 
    backgroundColor:'white', 
    padding:15, 
    height:40,
    justifyContent:'center',
    borderBottomWidth:0.5, 
    borderColor:'#d1ccc0',
 },
  anh_thao_tac:{ width: 10,
    height: 10,  
    margin:3},
});
