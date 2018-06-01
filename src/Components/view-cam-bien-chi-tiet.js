import React, {Component} from 'react';
import {View, Text, TouchableOpacity,Image, ScrollView, StyleSheet, ImageBackground, Alert} from 'react-native';
import {firebaseApp} from './../screens/FirebaseConfig';
import moment from 'moment';

export default class CamBienChiTiet extends Component{


	kiemtra=(dau,cuoi, socansosanh)=>{
		if (parseFloat(socansosanh) < parseFloat(dau))
			return (<Text style={css.low}>{socansosanh}</Text>);
		if(parseFloat(socansosanh) <= parseFloat(cuoi))
		  return (<Text style={css.good}>{socansosanh}</Text>);
		if (parseFloat(socansosanh) > parseFloat(cuoi))
		  return (<Text style={css.high}>{socansosanh}</Text>);
		else 
		  return (<Text>{socansosanh}</Text>);
	  }

	  ngayBatDauTheoDoi = (ngay)=>{
		let today = moment(new Date()).format('YYYY-MM-DD');
		let diff = moment(today,"YYYY-MM-DD").diff(moment(ngay,"YYYY-MM-DD"), 'days');
		return diff;
	}


	render(){
		const { navigate } = this.props.navigation;
		return(
			<ScrollView style={css.container}>
				<View style={css.col_header}>
						<Image source={{ uri: this.props.hinhanhcambien }} style={css.anh_dai_dien}/>
						<Text style={css.ten_cam_bien}>{this.props.tencambien}</Text>
						<Text  style={css.ngay_pin}>Theo dõi: {this.ngayBatDauTheoDoi(this.props.ngaybatdautheodoi)} ngày | Pin: {this.props.pin}%</Text>
					<View style={css.div_thao_tac}>
						<TouchableOpacity
							onPress={() => {
							this.props.navigation.navigate("ManHinh_CaiDatCamBien", {keycambien:this.props.keycambien,tencambien:this.props.tencambien,navigation:this.props.navigation,});
							}}>
							<View style={css.col_thao_tac} >
								<Image source={require('./../icons/settings.png')} style={css.anh_thao_tac}/>
								<Text style={css.ten_thao_tac}>Cài đặt</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
							navigate("ManHinh_ThayDoiCayTrong", {keycambien:this.props.keycambien});
							}}>
							<View style={css.col_thao_tac} >
								<Image source={require('./../icons/plant.png')} style={css.anh_thao_tac}/>
								<Text style={css.ten_thao_tac}>Cây trồng</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
							this.props.navigation.navigate("ManHinh_DatLichTuoi", {keycambien:this.props.keycambien, tencambien:this.props.tencambien, emailnguoidung:this.props.emailnguoidung});
							}}>
							<View style={css.col_thao_tac} >
								<Image source={require('./../icons/icon_calendar.png')} style={css.anh_thao_tac}/>
								<Text style={css.ten_thao_tac}>Lịch tưới</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
							this.props.navigation.navigate("ManHinh_ReportThongSo", {keycambien:this.props.keycambien, tencambien:this.props.tencambien});
							}}>
							<View style={css.col_thao_tac} >
								<Image source={require('./../icons/report.png')} style={css.anh_thao_tac}/>
								<Text style={css.ten_thao_tac}>Report</Text>
							</View>
						</TouchableOpacity>
					</View>					
				</View>
				<View style={css.col_body}>
					<View style={css.row_thong_so}>
						<View style={css.col_ten_thong_so}>
							<View style={css.sub_col_ten_thong_so}>
								<Image source={require('./../icons/doam.png')} style={css.anh_thong_so}/>
		                        <Text style={css.ten_thong_so}>Độ ẩm đất</Text>
							</View>
						</View>
						<View style={css.col_so_lieu}>
							<View style={css.sub_col_so_lieu}>
								{this.kiemtra(this.props.doambatdau, this.props.doamketthuc ,this.props.doam)}
								<Text style={css.moc_du_lieu}>{this.props.doambatdau} - {this.props.doamketthuc} (%)</Text>
							</View>		                        
						</View>
					</View>
					<View style={css.row_thong_so}>
						<View style={css.col_ten_thong_so}>
							<View style={css.sub_col_ten_thong_so}>
								<Image source={require('./../icons/nhietdo.png')} style={css.anh_thong_so}/>
		                        <Text style={css.ten_thong_so}>Nhiệt độ</Text>
							</View>
						</View>
						<View style={css.col_so_lieu}>
							<View style={css.sub_col_so_lieu}>
								{this.kiemtra(this.props.nhietdobatdau, this.props.nhietdoketthuc ,this.props.nhietdo)}
								<Text style={css.moc_du_lieu}>{this.props.nhietdobatdau} - {this.props.nhietdoketthuc} (°C)</Text>
							</View>		                        
						</View>
					</View>
					<View style={css.row_thong_so}>
						<View style={css.col_ten_thong_so}>
							<View style={css.sub_col_ten_thong_so}>
								<Image source={require('./../icons/anhsang.png')} style={css.anh_thong_so}/>
		                        <Text style={css.ten_thong_so}>Ánh sáng</Text>
							</View>
						</View>
						<View style={css.col_so_lieu}>
							<View style={css.sub_col_so_lieu}>
								{this.kiemtra(this.props.anhsangbatdau, this.props.anhsangketthuc ,this.props.anhsang)}
								<Text style={css.moc_du_lieu}>{this.props.anhsangbatdau} - {this.props.anhsangketthuc} (lux)</Text>
							</View>		                        
						</View>
					</View>
					<View style={css.row_thong_so}>
						<View style={css.col_ten_thong_so}>
							<View style={css.sub_col_ten_thong_so}>
								<Image source={require('./../icons/dat.png')} style={css.anh_thong_so}/>
		                        <Text  style={css.ten_thong_so}>EC</Text>
							</View>
						</View>
						<View style={css.col_so_lieu}>
							<View style={css.sub_col_so_lieu}>
								{this.kiemtra(this.props.domaumobatdau, this.props.domaumoketthuc ,this.props.domaumo)}
								<Text style={css.moc_du_lieu}>{this.props.domaumobatdau} - {this.props.domaumoketthuc} (µS/cm)</Text>
							</View>		                        
						</View>
					</View>
				</View>
			</ScrollView>
		);
	}
}

var css = StyleSheet.create({
	container:{
		flex:1, 
		width:'94%', 
		flexDirection: 'column',
   },
   col_header:{ flexDirection: 'column', padding:15, borderBottomWidth:0.5, borderColor:'#d1ccc0',  justifyContent: 'center', alignItems: 'center',},
   col_body:{ flexDirection: 'column',  marginTop: 10, },
   anh_dai_dien:{ width: 70, height: 70,borderRadius: 50,},
   ten_cam_bien:{ fontSize: 16, color: '#006266', marginTop:5,},
   ngay_pin:{ fontSize: 12, color: '#757575', marginTop:5},
   div_thao_tac:{flex: 0.2, flexDirection: 'row',},
   anh_thao_tac:{ width: 30, height: 30,borderRadius: 50,marginTop:10, marginLeft:20, marginRight:20,},
   col_thao_tac:{justifyContent: 'center', alignItems: 'center',},
   ten_thao_tac:{fontSize:10},
   row_thong_so:{ flexDirection: 'row', backgroundColor:'white', marginBottom:10, padding: 8, borderRadius:5, },
   col_ten_thong_so:{ flex: 0.5, flexDirection: 'column', justifyContent: 'center',},
   col_so_lieu:{ flex: 0.5, flexDirection: 'row',justifyContent: 'flex-end',},
   sub_col_ten_thong_so:{flexDirection: 'row', },
   anh_thong_so:{width: 15, height: 15, marginRight: 5,},
   ten_thong_so:{ fontSize: 12,},
   sub_col_so_lieu:{ alignItems: 'flex-end'},
   moc_du_lieu:{fontSize:8,},
   good:{
    color:'#00c300',
  },
  high:{
    color:'#ff3300',
  },
  low:{
    color:'#af0606',
  }

});