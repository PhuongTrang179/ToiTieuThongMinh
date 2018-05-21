import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

export default class Demo extends Component<Props> {
  render() {
    return (
      <View style={css.content}>
        <Text  style={css.a}>
          Hello
        </Text>
        <Text>
          {this.props.hienthi}
        </Text>
        <TouchableOpacity style={css.b}>
        	<Text>Click</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var css = StyleSheet.create({
	content:{
		width:100,
		height:100,
		margin:20
	},
	a:{
		fontSize:20,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	b:{
		backgroundColor: "red",
	    justifyContent: 'center',
	    alignItems: 'center',
	}
});