import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import {  StackNavigator, TabNavigator, DrawerNavigator,  } from 'react-navigation';
import Home from './screens/Home.js';
import Detail from './screens/Detail.js';
import User from './screens/User.js';
import Menu from './screens/Menu.js';
import Plant from './screens/Plant.js';
import Login from './screens/Login.js';
import ThemCayTrong from './screens/ThemCayTrongCamBien.js';
import XacNhanThemCayTrong from './screens/XacNhanThemCayTrong.js';
import CayTrongChiTiet from './screens/CayTrongChiTiet.js';

export const HomeStack = StackNavigator({
	ManHinh_Home:{
		screen: Home,
		// navigationOptions: ({ navigation }) => ({
      	// 	headerLeft: <MenuButton navigation={navigation} />,
    	// 	headerRight: <CalendarButton navigation={navigation} />,
    	// }),
	},
	ManHinh_Detail:{
		screen: Detail
	},
	ManHinh_ThemCayTrong:{
		screen: ThemCayTrong
	},
	ManHinh_XacNhanThemCayTrong:{
		screen: XacNhanThemCayTrong
	},
}
);

export const PlantStack = StackNavigator({
	ManHinh_Plant:{
		screen: Plant,
	},
	ManHinh_CayTrongChiTiet:{
		screen: CayTrongChiTiet
	},
});

export const UserStack = StackNavigator({
	ManHinh_User:{
		screen: User,

	}
});

export const TabBar = TabNavigator({
	Home: {
		screen: HomeStack,
		navigationOptions:{
			tabBarLabel: 'Thiết bị'
		}
	},
	Plant:{
		screen: PlantStack,
		navigationOptions:{
			tabBarLabel: 'Cây trồng'
		}
	},
	User:{
		screen: UserStack,
		navigationOptions:{
			tabBarLabel: 'Tôi'
		}
	}
},
{
	tabBarPosition:'bottom',
	tabBarOptions: {
      activeTintColor: '#2ecc71',
      inactiveTintColor: '#95a5a6',
      style:{
      	backgroundColor: '#ecf0f1',
      	
      },
      indicatorStyle : {
            backgroundColor: '#2ecc71'
        },
    },
});

// export const MenuButton = (props) => (
// 	<View>
// 		<TouchableOpacity style={{backgroundColor: "#fff", paddingLeft: 10}} 
// 						onPress={()=>{props.navigation.navigate('DrawerOpen')}} >
// 						<Image source={require('./icons/menu.png')} /> 
// 		</TouchableOpacity>
// 	</View>
// );

// export const CalendarButton = (props) => (
// 	<View>
// 		<TouchableOpacity style={{backgroundColor: "#fff", paddingRight: 10, }} 
// 						onPress={()=>{props.navigation.navigate('DrawerOpen')}} >
// 						<Image style={{width: 20, height: 20,}} source={require('./icons/calendar.png')} /> 
// 		</TouchableOpacity>
// 	</View>
// );

// const { width, height } = Dimensions.get('screen');

// export const SlideMenu = DrawerNavigator({
// 	Menu: {
// 		screen: TabBar,
// 	},
// },
// {
// 	drawerWidth: Math.min(height, width) * 0.8,
// 	drawerPosition:'left',
// 	contentComponent: props=> <Menu {...props} />
// }
// );


export const LoginStack = StackNavigator({
	ManHinh_Login:{
		screen: Login,
	},
	TabBar: {
		screen: TabBar,
	},
}
, {
    headerMode: 'none',
}
);