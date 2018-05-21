import React, {Component} from 'react';
import {View, Text, TouchableOpacity,Image, ScrollView, StyleSheet, ImageBackground} from 'react-native';
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

	layDuLieuCamBien = (key)=>{
		var x = [];
		firebaseApp.database().ref(`cambien/`+key).on('value', snapshot => {
			if(snapshot.val().dinhduong != null)
			{
				firebaseApp.database().ref('cambien/'+key+'/dinhduong').orderByKey().limitToLast(1).on('child_added', thongso => {
					firebaseApp.database().ref('cambien/'+key+'/caytrong').on('value', caytrong => {
						x.push(<CamBienChiTiet
								navigation={this.props.navigation}
								keycambien={key} 
								tencambien={snapshot.val().tencambien} 
								anhsang = {thongso.val().anhsang}
								doam = {thongso.val().doam}
								nhietdo = {thongso.val().nhietdo}
								domaumo = {thongso.val().domaumo}
								pin = {thongso.val().pin}
								anhsangbatdau= {caytrong.val().anhsangbatdau}
								anhsangketthuc= {caytrong.val().anhsangketthuc}
								doambatdau= {caytrong.val().doambatdau}
								doamketthuc= {caytrong.val().doamketthuc}
								nhietdobatdau= {caytrong.val().nhietdobatdau}
								nhietdoketthuc= {caytrong.val().nhietdoketthuc}
								domaumobatdau= {caytrong.val().domaumobatdau}
								domaumoketthuc= {caytrong.val().domaumoketthuc}
								ngaybatdautheodoi = {caytrong.val().ngaybatdautheodoi}
								hinhanhcambien = {caytrong.val().hinhanhcambien}
						/>);
					});
				});
			}
			else{
				firebaseApp.database().ref('cambien/'+key+'/caytrong').on('value', caytrong => {
					x.push(<CamBienChiTiet
							navigation={this.props.navigation}
							keycambien={key} 
							tencambien={snapshot.val().tencambien} 
							anhsang= '--'
							doam= '--'
							domaumo= '--'
							nhietdo= '--'
							pin = '--'
							anhsangbatdau= {caytrong.val().anhsangbatdau}
							anhsangketthuc= {caytrong.val().anhsangketthuc}
							doambatdau= {caytrong.val().doambatdau}
							doamketthuc= {caytrong.val().doamketthuc}
							nhietdobatdau= {caytrong.val().nhietdobatdau}
							nhietdoketthuc= {caytrong.val().nhietdoketthuc}
							domaumobatdau= {caytrong.val().domaumobatdau}
							domaumoketthuc= {caytrong.val().domaumoketthuc}
							ngaybatdautheodoi = {caytrong.val().ngaybatdautheodoi}
							hinhanhcambien = {caytrong.val().hinhanhcambien}
						/>);
				});
			}
		});
		return  x;
	  }

	render(){
		return(
			<ImageBackground source={require('./../images/bg-anh.jpg')}
			 		 imageStyle={{resizeMode: 'stretch'}}  style={css.bg}   > 			
				{this.layDuLieuCamBien(this.props.navigation.state.params.keycambien)}
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