import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

export default class Menu extends Component{

	render(){
		return(
			<View>
				<View>
					<TouchableOpacity style={{paddingTop:20, paddingLeft:10}} 
							onPress={()=>{this.props.navigation.navigate('DrawerClose')}} >
						<Image source={require('./../icons/close.png')} /> 
					</TouchableOpacity>
				</View>
				<View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
					<Text>Menu</Text>
				</View>
			</View>
		);
	}
}