import React, {Component} from 'react';
import { View, Text, TouchableOpacity,TextInput,StyleSheet, ImageBackground, Alert, AsyncStorage} from 'react-native';
import {firebaseApp} from './FirebaseConfig.js';

export default class Login extends Component{

	constructor(props){
		super(props)
		this.state = {
			
		}
	}

	getUser = async() =>{
		try {
			const value = await AsyncStorage.getItem('@MyEmail:key');
			if (value !== null){
				this.props.navigation.navigate('TabBar', {emailnguoidung:value});
            }
            else{
                this.props.navigation.navigate('ManHinh_Login');
            }
		  } catch (error) {
			console.log(error);
		  }
	}

	componentDidMount() {
		this.getUser();
	}
	
	render(){
		return(
			<View></View>
		);
	}
}

var css = StyleSheet.create({
	
});
