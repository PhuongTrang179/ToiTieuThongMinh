import	React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';


export default class MayTinh extends Component<props>{

	constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  onPress = () => {
    this.setState({
      count: this.state.count+1
    })
  }

	render(){
		return(
			<TouchableOpacity onPress={this.onPress} style={css.b}>
				<View>
					<Text>{this.state.count}</Text>
					<Text>{this.props.t == null ? 'rong' : this.props.t}</Text>
					<Text>{this.props.c}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

MayTinh.propType = {
	c:React.PropTypes.string,
};

var css = StyleSheet.create({
	b:{
		backgroundColor: "red",
	    justifyContent: 'center',
	    alignItems: 'center',
	    width:100,
		height:100,
		margin:20
	}
});