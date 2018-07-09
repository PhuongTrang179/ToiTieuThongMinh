import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
  Alert,
  TextInput,
} from "react-native";
import { firebaseApp } from "./FirebaseConfig.js";
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class CaiDatCamBien extends Component {
  static navigationOptions = {
    title: "Cài đặt",
    headerTitleStyle: {
      textAlign: "center",
      alignSelf: "center",
      // fontFamily: "MuseoSansRounded-300",
      fontWeight: "300",
      justifyContent: "space-between"
    },
    headerRight: (<View></View>)
  };

  constructor(props) {
    super(props);
    this.state = {
      mang: [],
      keycambien: this.props.navigation.state.params.keycambien,
      tencambien: this.props.navigation.state.params.tencambien,
      isDateTimePickerVisible: false,
    };
  }

  componentDidMount(){
    var key = this.props.navigation.state.params.keycambien;
    firebaseApp.database().ref(`cambien/`+key+'/caytrong').on('value', snapshot => {
      var dulieu = [];
      dulieu.push({
        anhsangbatdau:snapshot.val().anhsangbatdau,
        anhsangketthuc: snapshot.val().anhsangketthuc,
        doambatdau:snapshot.val().doambatdau,
        doamketthuc:snapshot.val().doamketthuc,
        domaumobatdau:snapshot.val().domaumobatdau,
        domaumoketthuc:snapshot.val().domaumoketthuc,
        nhietdobatdau:snapshot.val().nhietdobatdau,
        nhietdoketthuc:snapshot.val().nhietdoketthuc,
        hinhanhcambien:snapshot.val().hinhanhcambien,
        ngaybatdautheodoi:snapshot.val().ngaybatdautheodoi,        
      })
      this.setState({mang:dulieu});
    });
  }

  // DateTimePicker
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  
  render() {
    return (
      <ScrollView style={css.container}>
        <View style={css.col_header}>
            <ImageBackground imageStyle={{ borderRadius: 50,}} source={{ uri: 'http://3.bp.blogspot.com/-hGOT_0AY47E/Uk_kJ1pmVII/AAAAAAAAFwo/mj2MhAuaqGw/s1600/hinh-anh-hoa-hong-dep-1.jpg' }} style={css.anh_dai_dien} >
              <View style={{backgroundColor: '#34465d80',width:'100%', height:'100%',borderRadius: 50,alignItems:'center',justifyContent: 'center', }} >
                <Image source={require('./../icons/camera.png')} style={{width:15, height:15,}} />
              </View>
            </ImageBackground>						
            <TextInput style={css.textinput} placeholder='Tên cảm biến' underlineColorAndroid='#b2bec3' textAlign={'center'}
		        	onChangeText={(email) => this.setState({email})}
		        />
            <TouchableOpacity onPress={this._showDateTimePicker}>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
              <Text  style={css.ngay_pin}>Theo dõi từ ngày: 15-07-2018</Text>
              <Image source={require('./../icons/edit.png')} style={{width:10, height:10,marginLeft:5,}} />
            </View>
            </TouchableOpacity>
				</View>

				<View style={css.col_body}>
          <View style={{ marginTop:20, paddingLeft:20, paddingRight:20, marginBottom:5}} >
              <Text style={{fontSize:12}} >THÔNG SỐ CẢM BIẾN</Text>
          </View>
          <View style={{backgroundColor:'white', paddingLeft:10, paddingRight:10, borderBottomWidth:0.5,borderTopWidth:0.5, borderColor:'#d1ccc0',}} >       
            <View style={{flexDirection: 'row',  borderBottomWidth:0.5, borderColor:'#d1ccc0',}}>
              <View style={{flex:0.3, justifyContent:'center', marginLeft:10 }}>
                <View style={css.sub_col_ten_thong_so}>
                  <Image source={require('./../icons/doam.png')} style={css.anh_thong_so}/>
                              <Text style={css.ten_thong_so}>Độ ẩm đất</Text>
                </View>
              </View>
              <View style={{flex:0.7, justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <TextInput style={{width:'30%',margin: 10,	padding:5,	 borderRadius: 10, }} textAlign={'center'} placeholder='30' underlineColorAndroid='#b2bec3'
                    onChangeText={(email) => this.setState({email})}
                  />
                  <Text style={{width:'10%',  alignItems:'center' }}> - </Text>
                  <TextInput style={{width:'30%',margin: 10,	padding:5,	 borderRadius: 10, }} textAlign={'center'} placeholder='50' underlineColorAndroid='#b2bec3'
                    onChangeText={(email) => this.setState({email})}
                  />
                  <Text style={{width:'20%', fontSize:9}}> (%)</Text>
                </View>		                        
              </View>
            </View>
            <View style={{flexDirection: 'row', borderBottomWidth:0.5, borderColor:'#d1ccc0',}}>
              <View style={{flex:0.3, justifyContent:'center', marginLeft:10}}>
                <View style={css.sub_col_ten_thong_so}>
                  <Image source={require('./../icons/nhietdo.png')} style={css.anh_thong_so}/>
                              <Text style={css.ten_thong_so}>Nhiệt độ</Text>
                </View>
              </View>
              <View style={{flex:0.7, justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <TextInput style={{width:'30%',margin: 10,	padding:5,	 borderRadius: 10, }} textAlign={'center'} placeholder='30' underlineColorAndroid='#b2bec3'
                    onChangeText={(email) => this.setState({email})}
                  />
                  <Text style={{width:'10%',  alignItems:'center' }}> - </Text>
                  <TextInput style={{width:'30%',margin: 10,	padding:5,	 borderRadius: 10, }} textAlign={'center'} placeholder='50' underlineColorAndroid='#b2bec3'
                    onChangeText={(email) => this.setState({email})}
                  />
                  <Text  style={{width:'20%', fontSize:9}}> (°C)</Text>
                </View>		                        
              </View>
            </View>
            <View style={{flexDirection: 'row', borderBottomWidth:0.5, borderColor:'#d1ccc0',}}>
              <View style={{flex:0.3, justifyContent:'center', marginLeft:10 }}>
                <View style={css.sub_col_ten_thong_so}>
                  <Image source={require('./../icons/anhsang.png')} style={css.anh_thong_so}/>
                              <Text style={css.ten_thong_so}>Ánh sáng</Text>
                </View>
              </View>
              <View style={{flex:0.7, justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <TextInput style={{width:'30%',margin: 10,	padding:5,	 borderRadius: 10, }} textAlign={'center'} placeholder='30' underlineColorAndroid='#b2bec3'
                    onChangeText={(email) => this.setState({email})}
                  />
                  <Text style={{width:'10%',  alignItems:'center' }}> - </Text>
                  <TextInput style={{width:'30%',margin: 10,	padding:5,	 borderRadius: 10, }} textAlign={'center'} placeholder='500000' underlineColorAndroid='#b2bec3'
                    onChangeText={(email) => this.setState({email})}
                  />
                  <Text style={{width:'20%', fontSize:9}}> (lux)</Text>
                </View>		                        
              </View>
            </View>
            <View style={{flexDirection: 'row', }}>
              <View style={{flex:0.3, justifyContent:'center', marginLeft:10 }}>
                <View style={css.sub_col_ten_thong_so}>
                  <Image source={require('./../icons/dat.png')} style={css.anh_thong_so}/>
                              <Text style={css.ten_thong_so}>EC</Text>
                </View>
              </View>
              <View style={{flex:0.7, justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                  <TextInput style={{width:'30%',margin: 10,	padding:5,	 borderRadius: 10, }} textAlign={'center'} placeholder='30' underlineColorAndroid='#b2bec3'
                    onChangeText={(email) => this.setState({email})}
                  />
                  <Text style={{width:'10%',  alignItems:'center' }}> - </Text>
                  <TextInput style={{width:'30%',margin: 10,	padding:5,	 borderRadius: 10, }} textAlign={'center'} placeholder='50' underlineColorAndroid='#b2bec3'
                    onChangeText={(email) => this.setState({email})}
                  />
                  <Text style={{width:'20%', fontSize:9}}> (µS/cm)</Text>
                </View>		                        
              </View>
            </View>
          </View> 
				</View>    
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          maximumDate= {new Date()}
          
        />   
      </ScrollView>
    );
  }
}

var css = StyleSheet.create({
  container:{
		flex:1,
    flexDirection: 'column',
   },
   col_header:{ flexDirection: 'column', padding:15, backgroundColor:'white', borderBottomWidth:0.5, borderColor:'#d1ccc0',  justifyContent: 'center', alignItems: 'center',},
   col_body:{ flexDirection: 'column',  },
   anh_dai_dien:{ width: 70, height: 70, },
   ten_cam_bien:{ fontSize: 16, color: '#006266', marginTop:5,},
   ngay_pin:{ fontSize: 12, color: '#757575',},
   col_ten_thong_so:{ flex: 0.5, flexDirection: 'column', justifyContent: 'center',},
   sub_col_ten_thong_so:{flexDirection: 'row', },
   anh_thong_so:{width: 15, height: 15, marginRight: 5,},
   ten_thong_so:{ fontSize: 12,},
  textinput:{
		margin: 8,
		padding:5,
		paddingLeft:10,
		paddingRight:10,
    width:'60%',
    borderRadius: 10,
	},

});
