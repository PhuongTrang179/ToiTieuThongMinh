import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image,Alert, AsyncStorage, StyleSheet,TextInput, ActivityIndicator, Platform} from 'react-native';
import {firebaseApp} from './FirebaseConfig.js';
import RNFetchBlob from 'react-native-fetch-blob'
var ImagePicker = require('react-native-image-picker');

var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const storage = firebaseApp.storage();
const Blob =	RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, mime = 'img/jpg') => {
	return new Promise((resolve, reject) => {
		const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
		const sessionId = new Date().getTime();
		let uploadBlob = null;
		const imageRef = storage.ref('images').child(`${sessionId}.jpg`);

		fs.readFile(uploadUri, 'base64')
			.then((data) => {
				return Blob.build(data, { type:`${mime};BASE64` });
			})
			.then((blob) => {
				uploadBlob = blob
				return imageRef.put(blob, { contentType: mime })
			})
			.then(() => {
				uploadBlob.close()
				return imageRef.getDownloadURL()
			})
			.then((url) => {
				resolve(url)
			})
			.catch((error) => {
				reject(error)
		})
	})
};

export default class User extends Component{

	static navigationOptions = {
        title: 'Tôi',
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
            //fontFamily: 'MuseoSansRounded-300',
            fontWeight: '300',
            justifyContent: 'space-between',
        },
	};
	constructor(props){
		super(props)
		this.state = {
					 emailnguoidung:this.props.navigation.state.params.emailnguoidung,
					 anh:'',
					 ten:'',

		}
    }

	componentDidMount() {
		var emailnguoidung = this.props.navigation.state.params.emailnguoidung;
		this.getThongTin();
		
	}

	resetMatKhau = () =>{
		firebaseApp.auth().sendPasswordResetEmail(this.state.emailnguoidung).then(()=>{
			Alert.alert(
				'Thông báo',
				'Một email reset mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn!',
				[
				  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				  {text: 'OK', onPress: () => console.log('OK Pressed')},
				],
				{ cancelable: false }
			  )
		});
	}

	dangXuat = ()=>{
		this.removeItemValue();
	}

	async removeItemValue() {
		try {
			await AsyncStorage.removeItem('@MyEmail:key');
			await AsyncStorage.removeItem('thongtinnguoidung');
		  this.props.navigation.navigate('Loading');
		}
		catch(exception) {
		  return false;
		}
		}

		async getThongTin(){
			try {
				await AsyncStorage.getItem('thongtinnguoidung').then((value) => {
					// JSON.parse(value).map((key, value)=>{
					// 	alert(value);
					// });
					this.setState({ten:JSON.parse(value)[0].ten, anh: JSON.parse(value)[0].anh});
				}
				)
			} catch (error) {
				Alert.alert(
					'Alert Title',
					JSON.stringify(error),
					[
						{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
						{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
						{text: 'OK', onPress: () => console.log('OK Pressed')},
					],
					{ cancelable: false }
				)

			 }
		}

		chonHinh(){
			ImagePicker.showImagePicker(options, (response) => {			
				if (response.didCancel) {
				}
				else if (response.error) {
				}
				else if (response.customButton) {
				}
				else {
					uploadImage(response.uri)
					.then(url => this.setState({path: url}))
					.catch(err => console.log(err))
				}
			});
		}

		
	

	render(){
		return(
			<View style={{flex:1}}>
				<View style={css.view_anh}>
						<Image source={{ uri: this.state.anh }} style={css.anh_dai_dien}/>
					</View>
				<View style={css.view}  >
					<Text style={css.label}>Tên người dùng</Text>
					<View style={css.row} >					
							<TextInput
								style={{height:40}}
								underlineColorAndroid='transparent'
								onChangeText={(ten) => this.setState({ten})}
								value={this.state.ten}
							/>
					</View>
				</View>
				<View  style={css.view} >
					<Text style={css.label}>Email</Text>
					<View style={{backgroundColor:'white',		padding: 11,	borderBottomWidth:0.5, 	borderTopWidth:0.5, 	borderColor:'#d1ccc0', }} >					
						<Text>{this.state.emailnguoidung}</Text>
					</View>
				</View>
				<View style={{margin:10}} ></View>
				<View style={css.btn_row} >	
					<TouchableOpacity onPress={()=>this.resetMatKhau()}><Text style={{color:'#F9A825',}}>Đổi mật khẩu</Text></TouchableOpacity>
				</View>
				<View style={css.btn_row} >	
					<TouchableOpacity onPress={()=>this.dangXuat()}><Text style={{color:'#f44336',}}>Đăng xuất</Text></TouchableOpacity>
				</View>

{
	(()=>{
		switch(this.state.path){
			case null:
				return null
			case '':
				return <ActivityIndicator></ActivityIndicator>
			default:
				return(
					<View style={css.view_anh}>
					<Image source={{uri:this.state.path}} style={css.anh_dai_dien}/>
					</View>
				)
		}
	}) ()
}

	<TouchableOpacity onPress={()=>this.chonHinh()}>
					<View >
					

<Text>Chon hanh</Text>

					</View>



				</TouchableOpacity>

			</View>
		);
	}
}

const css = StyleSheet.create({
	view_anh:{
		justifyContent: "center",
		alignItems: "center", 
		
	},
	anh_dai_dien:{width: 80, height: 80, marginTop: 10,marginBottom: 10,
		borderBottomLeftRadius: 40,
		borderBottomRightRadius: 40,
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
	},
	row:{
		backgroundColor:'white',
		paddingLeft: 10,
		paddingRight: 10,
		borderBottomWidth:0.5, 
		borderTopWidth:0.5, 
		borderColor:'#d1ccc0', 
	},
	view:{
		marginBottom:10,
	},
	label:{
		paddingLeft:10,
		paddingBottom:3,
	},
	btn_row:{
		backgroundColor:'white',
		padding: 10,
		borderBottomWidth:0.5, 
		borderTopWidth:0.5, 
		borderColor:'#d1ccc0', 
		justifyContent: "center",
		alignItems: "center", 
	},
	textinput:{
		margin: 8,
		padding:5,
		paddingLeft:10,
    paddingRight:10,
    width:60,
  },
});