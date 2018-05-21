import React, { Component } from 'react';
import { View,StyleSheet,Text,TouchableOpacity } from 'react-native';


/*const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
*/


export default class App extends Component{
  constructor(props){
    super(props)
    this.state={
      kq:0,
      so1:0,
      so2:0,
      pt:''
    }
  }

  clickNum = (so)=>{
    this.setState({
      pt: this.state.pt + so
    })
  }

  dong(){
    const d = [];
    let dem = 0;
    for (let i = 0; i < 3; i++) {        
        let c =[];
          for (let j = 0; j < 3; j++) {
            c.push(<View style={css.col} key={j}>
              <TouchableOpacity style={css.nut}  onPress={() => this.clickNum({j})}>
                <Text style={css.t}
                >{j + 1 + dem}</Text>
                </TouchableOpacity>
              </View>)
          }
      d.push(<View style={css.row} key={i}>{c}</View>)
        {dem+=3}
    }
    return d;
  }

  render() {
    return (
      <View style={css.main}>
        <View style={css.kq}>
          <View style={{flex:1}}>
            <Text style={{textAlign: 'left'}}>{this.state.pt}</Text>
          </View>
          <View style={{flex:1, justifyContent: 'center'}}>
            <Text style={{textAlign: 'right'}}>0</Text>
          </View>
        </View>
        <View style={css.content}>
          <View style={css.subcontent}>
            {this.dong()}
          </View>
          <View style={css.pt}>
            <View style={css.ptcol}>
               <View style={css.ptrow}>
                  <TouchableOpacity style={css.nut}
                   onPress={() => this.clickNum('+')} >
                    <Text style={css.t}>+</Text>
                  </TouchableOpacity>
               </View>
               <View style={css.ptrow}>
                 <TouchableOpacity style={css.nut}
                 onPress={() => this.clickNum('-')}>
                    <Text style={css.t}>-</Text>
                  </TouchableOpacity>
               </View>
               <View style={css.ptrow}>
                 <TouchableOpacity style={css.nut}>
                    <Text style={css.t}>=</Text>
                  </TouchableOpacity>
               </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


var css = StyleSheet.create({
  main:{
    flex:1,
  },
  content:{
    flex:1,
    flexDirection:'row'
  },
  subcontent:{
    flex:3/4,
  },
  pt:{
    flex:1/4,
  },
  row:{
    flex:1,
    borderTopWidth:1,
    borderColor:'gray',
    flexDirection:'row',
  },
  col:{
    flex:1,
    borderRightWidth:1,
    borderColor:'gray',
  },
  ptrow:{
    flex:1,
    borderTopWidth:1,
    borderColor:'gray',
  },
  ptcol:{
    flex:1,
  },
  kq:{
    flex:1/4,
  },
  t:{
    fontSize:20,
  },
  nut:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

