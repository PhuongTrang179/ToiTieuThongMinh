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
  Picker,
  TextInput
} from "react-native";
import { firebaseApp } from "./FirebaseConfig.js";
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Dialog, } from 'react-native-simple-dialogs';

export default class TuyChinhGioTuoi extends Component {
  static navigationOptions = {
    title: "Tùy chỉnh",
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
      thoidiemtuoi:[],
      keycambien: this.props.navigation.state.params.keycambien,
      kieutuoi:'',
      isDateTimePickerVisible: false,
      keyitempress:'',
      keyitemthoigiantuoi:'',
      text: '',
    };
  }

  componentDidMount() {
    var key = this.props.navigation.state.params.keycambien;
    firebaseApp.database().ref(`cambien/`+key+'/datlich').on('value', data => {
      if(data.val().thoidiemtuoi == null)
      {
        firebaseApp.database().ref('cambien/'+key+'/datlich').update({
          tansuat: 'hangngay',
        }).then(()=>{
          firebaseApp.database().ref('cambien/'+key+'/datlich/thoidiemtuoi/').push({
            giotuoi:this.GetTime(),
            thoigiantuoi: '60'
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
      }
      else{
        firebaseApp.database().ref(`cambien/`+key+'/datlich/thoidiemtuoi').orderByChild('giotuoi').on('value', snapshot => {
          var dl = [];
          snapshot.forEach(function(dulieu) {
            dl.push({
              keythoidiemtuoi: dulieu.key,
              giotuoi: dulieu.val().giotuoi,
              thoigiantuoi: dulieu.val().thoigiantuoi,
            });
          });
          this.setState({kieutuoi:data.val().kieutuoi, thoidiemtuoi:dl});
        });
      }      
    });
 
  }
 
  componentWillUnmount(){

  }

  themItemGioTuoi = () =>{
    firebaseApp.database().ref('cambien/'+this.state.keycambien+'/datlich/thoidiemtuoi/').push({
      giotuoi:this.GetTime(),
      thoigiantuoi: '60'
    });
  }

  //DateTimePicker
  _showDateTimePicker = (key) => this.setState({ isDateTimePickerVisible: true, keyitempress:key });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (time) => {
    firebaseApp.database().ref('cambien/'+this.state.keycambien+'/datlich/thoidiemtuoi/'+this.state.keyitempress).update({
      giotuoi:moment(time).format('HH:mm')
    }).then(()=>{
      this._hideDateTimePicker();
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
  };

  GetTime() {
    var date, hour, minutes, fullTime;

    date = new Date();

    hour = date.getHours(); 

    minutes = date.getMinutes();

    if(hour < 10)
    {
      hour = '0' + hour.toString();
    }

    if(minutes < 10)
    {
      minutes = '0' + minutes.toString();
    }
    
    return fullTime = hour.toString() + ':' + minutes.toString() ;
 
  }

  keyExtractor = (item) => item.id;

  renderItemThoiGianTuoi = ({item}) => {
    return(
      <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center',marginBottom:10, marginTop:10}} >
        <View style={{ flex:0.9, flexDirection:'row', }} >
          <View style={{flex:0.5, alignItems:'flex-end'}} >
            <TouchableOpacity onPress={ (event)=>this._showDateTimePicker(item.keythoidiemtuoi)}>
              <Text>Bắt đầu lúc {item.giotuoi}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:0.5, flexDirection:'row',}}>
            <TouchableOpacity onPress={(event) => this.openDialog(item.keythoidiemtuoi, item.thoigiantuoi)}>
              <Text>, tưới trong {item.thoigiantuoi} giây </Text>
            </TouchableOpacity>
          </View>
                    
        </View>
        <View style={{flex:0.1,justifyContent: 'center', alignItems:'flex-end',}}>
            <TouchableOpacity  onPress={ (event)=>this.xoaItemThoiDiemTuoi(item.keythoidiemtuoi)}>
              <Image source={require('./../icons/minus.png')} style={{width:15, height:15,}}/>
            </TouchableOpacity>
          </View>   
      </View>
    );
  }
  //Dialog
  openDialog(keyitemthoigiantuoi,thoigiantuoi) {
    this.setState({ showDialog: true, keyitemthoigiantuoi:keyitemthoigiantuoi , text:thoigiantuoi })
  }

  changeThoiGianTuoi = () =>{
    firebaseApp.database().ref('cambien/'+this.state.keycambien+'/datlich/thoidiemtuoi/'+this.state.keyitemthoigiantuoi).update({
      thoigiantuoi:this.state.text
    }).then(()=>{
      this.closeDialog();
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

  closeDialog = () => this.setState({ showDialog: false });

  //Input chỉ nhập số
  onChange(text) {
      let newText = '';
      let numbers = '0123456789';

      for (var i = 0; i < text.length; i++) {
          if ( numbers.indexOf(text[i]) > -1 ) {
              newText = newText + text[i];
          }
      }   
      this.setState({text:newText});
  }
  //Xóa item thời điểm tưới
  xoaItemThoiDiemTuoi = (key) =>{
    firebaseApp.database().ref('cambien/'+this.state.keycambien+'/datlich/thoidiemtuoi/'+key).remove();
  }

  render() {
    return (
      <View style={css.container}>
        <View style={css.row}>
          <View style={{flex:0.6, justifyContent: 'center', }} ><Text>Tần suất</Text></View>
          <View style={{flex:0.4, justifyContent: 'center', }} >
            <Picker
              selectedValue={this.state.kieutuoi}
              style={css.pickerStyle}
              onValueChange={(itemValue, itemIndex) => this.setState({kieutuoi: itemValue})}>
              <Picker.Item  label="Hằng ngày" value="hangngay" />
              <Picker.Item label="Hằng tuần" value="hangtuan" />
            </Picker>
          </View>
        </View>
        <View style={css.row}>
          <View style={{flex:0.8, justifyContent: 'center', }} >
            <Text>Thời gian</Text>
          </View>
          <View style={{flex:0.2, justifyContent: 'center', alignItems: 'flex-end', }} >
            <TouchableOpacity style={{width:'100%',alignItems: 'flex-end',}} onPress={this.themItemGioTuoi} >
              <Image source={require('./../icons/plus.png')} style={{width:13, height:13,}}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', backgroundColor:'white',  padding:15,  justifyContent:'center',}}>
            <FlatList
                      data={this.state.thoidiemtuoi}
                      extraData={this.state}
                      keyExtractor = {this.keyExtractor}
                      renderItem={this.renderItemThoiGianTuoi.bind(this)}
                  />
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          datePickerModeAndroid={'spinner'}
          mode={'time'}
        />
         <Dialog
            visible={this.state.showDialog}
            onTouchOutside={() => this.closeDialog()}
            contentStyle={{ justifyContent: 'center', alignItems: 'center',padding:5}}
            animationType="fade">
            <View style={{height:116, width:'100%', flexDirection: 'column',alignItems: 'center',}}>
              <View style={{flex:0.4, flexDirection: 'row',  alignItems: 'center',}}>
                <TextInput
                  style={css.textinput}
                  keyboardType = 'numeric'
                  maxLength = {3}
                  onChangeText={(text) => this.onChange(text)}
                  value={this.state.text}
                  textAlign={'center'} 
                />
                <Text>giây</Text>
              </View>
              <View style={{flex:0.6,  alignItems: 'center', marginTop:5}}>
                <TouchableOpacity onPress={() => this.changeThoiGianTuoi()} style={css.btnThoiGianTuoi} >
                  <Text style={{color:'white'}} >Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Dialog>
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
    marginBottom:10, 
    height:40,
    justifyContent:'center',
 },
  pickerStyle: {
    width:'100%'
  },
  textinput:{
		borderColor: 'gray', borderWidth: 1,
		borderRadius: 10,
		margin: 8,
		padding:5,
		paddingLeft:10,
    paddingRight:10,
    width:60,
  },
  btnThoiGianTuoi:{
      padding:7,
      borderRadius:2,
      backgroundColor: "#00b894",
      marginBottom:10,
      marginTop:10,
  },
});
