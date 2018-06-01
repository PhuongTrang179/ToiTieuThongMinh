import React, {Component} from 'react';
import {View, Text, TouchableOpacity,Image, ScrollView, StyleSheet, ImageBackground, Alert} from 'react-native';
import {firebaseApp} from './FirebaseConfig.js';
import CamBienChiTiet from './../Components/view-cam-bien-chi-tiet.js';

export default class Detail extends Component{

	static navigationOptions = {
		 title:'Chi tiết',
		headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: 'MuseoSansRounded-300',
            fontWeight: '100',
			justifyContent: 'space-between',
			fontSize:17,
		},
		// headerStyle: {
		// 		height: 45,
		// 	}

		headerRight: (<View></View>)
	}

	constructor(props) {
		super(props);
		this.state = {
			key: this.props.navigation.state.params.keycambien,
			emailnguoidung: this.props.navigation.state.params.emailnguoidung,
			mang: []
		};
	  }

	  componentDidMount() {
		var key = this.props.navigation.state.params.keycambien;
		firebaseApp.database().ref('cambien/'+key).update({
			delay:500
		}).then(()=>{
			firebaseApp.database().ref(`cambien/`+key).on('value', snapshot => {
				let x = [];
				if(snapshot.val().dinhduong != null)
				{
					firebaseApp.database().ref('cambien/'+key+'/dinhduong').limitToLast(1).on('child_added', thongso => {
						firebaseApp.database().ref('cambien/'+key+'/caytrong').on('value', caytrong => {
							x.push({
									keycambien:key,
									tencambien:snapshot.val().tencambien,
									anhsang:thongso.val().anhsang,
									doam :thongso.val().doam,
									nhietdo:thongso.val().nhietdo,
									domaumo:thongso.val().domaumo,
									pin:thongso.val().pin,
									anhsangbatdau:caytrong.val().anhsangbatdau,
									anhsangketthuc:caytrong.val().anhsangketthuc,
									doambatdau:caytrong.val().doambatdau,
									doamketthuc:caytrong.val().doamketthuc,
									nhietdobatdau:caytrong.val().nhietdobatdau,
									nhietdoketthuc:caytrong.val().nhietdoketthuc,
									domaumobatdau:caytrong.val().domaumobatdau,
									domaumoketthuc:caytrong.val().domaumoketthuc,
									ngaybatdautheodoi :caytrong.val().ngaybatdautheodoi,
									hinhanhcambien:caytrong.val().hinhanhcambien,
							});
						});
					});
				}
				else{
					firebaseApp.database().ref('cambien/'+key+'/caytrong').on('value', caytrong => {
						x.push({
								anhsang:'--',
								doam:'--',
								domaumo:'--',
								nhietdo:'--',
								pin:'--',
								keycambien:key,
								tencambien:snapshot.val().tencambien,
								anhsangbatdau:caytrong.val().anhsangbatdau,
								anhsangketthuc:caytrong.val().anhsangketthuc,
								doambatdau:caytrong.val().doambatdau,
								doamketthuc:caytrong.val().doamketthuc,
								nhietdobatdau:caytrong.val().nhietdobatdau,
								nhietdoketthuc:caytrong.val().nhietdoketthuc,
								domaumobatdau:caytrong.val().domaumobatdau,
								domaumoketthuc:caytrong.val().domaumoketthuc,
								ngaybatdautheodoi :caytrong.val().ngaybatdautheodoi,
								hinhanhcambien:caytrong.val().hinhanhcambien,
						});
					});
				}
				 this.setState({mang:x});
			});
		  })
		  .catch(function(error) {
			Alert.alert(
			  'Thông báo',
			  'Update delay lỗi',
			  [
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'OK', onPress: () => console.log('OK Pressed')},
			  ],
			  { cancelable: false }
			)
		  });
	 
	}

	componentWillUnmount(){
		firebaseApp.database().ref('cambien/'+this.state.key).update({
			delay:500
		}).catch(function(error) {
			Alert.alert(
			  'Thông báo',
			  'Update delay lỗi',
			  [
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'OK', onPress: () => console.log('OK Pressed')},
			  ],
			  { cancelable: false }
			)
		  });
	}

	renderItem = () => {
		var x = [];
		this.state.mang.map((item) => {
			x.push(
				<CamBienChiTiet 
					navigation={this.props.navigation}
					emailnguoidung= {this.state.emailnguoidung}
					keycambien={this.state.key} 
					tencambien={item.tencambien} 
					anhsang = {item.anhsang}
					doam = {item.doam}
					nhietdo = {item.nhietdo}
					domaumo = {item.domaumo}
					pin = {item.pin}
					anhsangbatdau= {item.anhsangbatdau}
					anhsangketthuc= {item.anhsangketthuc}
					doambatdau= {item.doambatdau}
					doamketthuc= {item.doamketthuc}
					nhietdobatdau= {item.nhietdobatdau}
					nhietdoketthuc= {item.nhietdoketthuc}
					domaumobatdau= {item.domaumobatdau}
					domaumoketthuc= {item.domaumoketthuc}
					ngaybatdautheodoi = {item.ngaybatdautheodoi}
					hinhanhcambien = {item.hinhanhcambien}
				/>
			);
		})
		return x;
	}

	render(){
		return(
			<ImageBackground source={require('./../images/bg-anh.jpg')}
			 		 imageStyle={{resizeMode: 'stretch'}}  style={css.bg}   > 			
				{this.renderItem()}
			</ImageBackground>
		);
	}
}

var css = StyleSheet.create({
	bg:{
		flex: 1,
	   justifyContent: 'center',
	   alignItems: 'center',
	   width: null,
	   height: null,
	},
});