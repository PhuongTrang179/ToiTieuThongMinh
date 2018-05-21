import React, {Component} from 'react';
import { View, Text, TouchableOpacity,TextInput,StyleSheet, ImageBackground, Alert} from 'react-native';
import {firebaseApp} from './FirebaseConfig.js';

export default class Login extends Component{

	constructor(props){
		super(props)
		this.state = {
			email:'',
			pass:'',
		}
	}

	dangNhap(){
		firebaseApp.auth().signInWithEmailAndPassword(this.state.email,this.state.pass )
		.then(()=>{
			this.props.navigation.navigate('TabBar', {emailnguoidung:this.state.email})
		})
		.catch(function(error) {
			Alert.alert(
			  'Thông báo',
			  'Đăng nhập thất bại',
			  [
			    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			    {text: 'OK', onPress: () => console.log('OK Pressed')},
			  ],
			  { cancelable: false }
			)
		});
	}

	render(){
		return(
			<ImageBackground source={require('./../images/background.jpg')}
			 		 imageStyle={{resizeMode: 'stretch'}}  style={css.bg}   >
		      <View  style={css.container}>
		      	<TextInput style={css.textinput} placeholder='Tên đăng nhập' underlineColorAndroid='transparent'
		        	onChangeText={(email) => this.setState({email})}
		        />
		        <TextInput secureTextEntry={true} style={css.textinput} placeholder='Mật khẩu' underlineColorAndroid='transparent'
					onChangeText={(pass) => this.setState({pass})}
		         />
		        <TouchableOpacity style={css.btn} 
					onPress={()=>{this.dangNhap()}}		 >
					<Text style={css.textbtn}>ĐĂNG NHẬP</Text>
				</TouchableOpacity>

		      </View>
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
	container:{
		 width:  '80%',
	},
	textinput:{
		borderColor: 'gray', borderWidth: 1,
		borderRadius: 10,
		margin: 8,
		padding:5,
		paddingLeft:10,
		paddingRight:10,
		backgroundColor: '#EEEEEE80' 
	},
	btn:{
		borderRadius: 10,
		marginTop: 30,
		marginLeft: 8,
		marginRight: 8,
		justifyContent: 'center',
    	alignItems: 'center',
    	backgroundColor: "#00b894",
	},
	textbtn:{
		fontSize:18, 
		padding:10, 
		color: 'white',
	}
});
