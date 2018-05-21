import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList, Alert} from 'react-native';
import {firebaseApp} from './FirebaseConfig.js';
import CamBienHoatDong from './../Components/view-cam-bien-hoat-dong.js';
import CamBienChuaHoatDong from './../Components/view-cam-bien-chua-hoat-dong.js';

export default class Home extends Component {

    static navigationOptions = {
        title: 'Thiết bị',
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: 'MuseoSansRounded-300',
            fontWeight: '300',
            justifyContent: 'space-between',
        },
    };

    constructor(props){
		super(props)
		this.state = {
            mang: [],
            chuacodulieu:[]
		}
    }

    sosanhthongso=(dau,cuoi, socansosanh)=>{
        if(parseFloat(socansosanh) < parseFloat(dau))
            return 'low';
        else if(parseFloat(socansosanh) <= parseFloat(cuoi))
            return 'good';
        else if(parseFloat(socansosanh) > parseFloat(cuoi))
            return 'high';
        return ' --';
    }
    
    componentDidMount() {
        firebaseApp.database().ref(`cambien`).orderByChild('emailnguoidung').equalTo(this.props.navigation.state.params.emailnguoidung).on('value', snapshot => {
            let dl=[];
            let chuacodl=[];
            snapshot.forEach(function(data) {
                if(data.val().caytrong == null){
                    chuacodl.push({
                        id: data.key,
                        tencambien: data.val().tencambien
                    })
                }
                else{
                    if(data.val().dinhduong != null)
                    {
                        firebaseApp.database().ref('cambien/'+data.key+'/dinhduong').orderByKey().limitToLast(1).on('child_added', thongso => {
                            firebaseApp.database().ref('cambien/'+data.key+'/caytrong').on('value', caytrong => {
                                dl.push({
                                    anhsangbatdau: caytrong.val().anhsangbatdau,
                                    anhsangketthuc: caytrong.val().anhsangketthuc,
                                    doambatdau: caytrong.val().doambatdau,
                                    doamketthuc: caytrong.val().doamketthuc,
                                    nhietdobatdau: caytrong.val().nhietdobatdau,
                                    nhietdoketthuc:caytrong.val().nhietdoketthuc,
                                    domaumobatdau: caytrong.val().domaumobatdau,
                                    domaumoketthuc: caytrong.val().domaumoketthuc,
                                    anhsang: thongso.val().anhsang,
                                    doam: thongso.val().doam,
                                    domaumo: thongso.val().domaumo,
                                    nhietdo: thongso.val().nhietdo,
                                    id: data.key,
                                    tencambien: data.val().tencambien,
                                    hinhanhcambien: data.val().caytrong.hinhanhcambien
                                });
                            });
                        });
                    }
                    else{
                        dl.push({
                            anhsang: '--',
                            doam: '--',
                            domaumo: '--',
                            nhietdo: '--',
                            id: data.key,
                            tencambien: data.val().tencambien,
                            hinhanhcambien: data.val().caytrong.hinhanhcambien
                        });
                    }
                    
                }
            });
            this.setState({mang:dl, chuacodulieu:chuacodl});
          })
          
      }

      keyExtractor = (item) => item.id;

      CamBienChuaHoatDong(){
        if(this.state.chuacodulieu.length > 0)
           return <View >
                    <View  style={{ paddingLeft :5, margin:5}}>
                        <Text>Cảm biến chưa hoạt động</Text>
                    </View>
                    <View style={{backgroundColor:'white'}}>
                        <FlatList
                            data={this.state.chuacodulieu}
                            extraData={this.state}
                            keyExtractor = {this.keyExtractor}
                            renderItem={this.renderItemCamBienChuaHoatDong.bind(this)}
                        />
                    </View>
                </View>;
        return null;
     }

     CamBienDaHoatDong(){
        if(this.state.mang.length > 0)
        {
            return (<View >
                <View  style={{ paddingLeft :5, margin:5}}>
                    <Text>Cảm biến đang hoạt động</Text>
                </View>
                <View style={{backgroundColor:'white'}}>
                    <FlatList
                        data={this.state.mang}
                        extraData={this.state}
                        keyExtractor = {this.keyExtractor}
                        renderItem={this.renderItemCamBienDaHoatDong.bind(this)}
                    />
                </View>
            </View>);
        }
        return null;
     }

     renderItemCamBienChuaHoatDong = ({item}) => {
        return(
            <CamBienChuaHoatDong 
                tencambien={item.tencambien} 
                keycambien={item.id} 
                navigation={this.props.navigation} 
                emailnguoidung={this.props.navigation.state.params.emailnguoidung}
            />
        );
    }

    renderItemCamBienDaHoatDong = ({item}) => {
        return(
            <CamBienHoatDong 
                tencambien={item.tencambien} 
                keycambien={item.id} 
                navigation={this.props.navigation}
                emailnguoidung={this.props.navigation.state.params.emailnguoidung}
                hinhanhcambien = {item.hinhanhcambien}
                anhsang = {this.sosanhthongso(item.anhsangbatdau,item.anhsangketthuc,item.anhsang)}
                doam = {this.sosanhthongso(item.doambatdau,item.doamketthuc,item.doam)}
                nhietdo = {this.sosanhthongso(item.nhietdobatdau,item.nhietdoketthuc,item.nhietdo)}
                domaumo = {this.sosanhthongso(item.domaumobatdau,item.domaumoketthuc,item.domaumo)}
            />
        );
    }

    render() {
        return (
            <ScrollView>
                <View style={css.container}>
                     { this.CamBienChuaHoatDong() }
                
                    { this.CamBienDaHoatDong() }
                 
                </View>
            </ScrollView>
            /*<View style={{flex:1, justifyContent: 'center', alignItems: 'center',backgroundColor: "white",}}>
                <Text>Home</Text>
                <TouchableOpacity style={{backgroundColor: "#2ecc71",}}
                    onPress={()=>{this.props.navigation.navigate('ManHinh_Detail',{thamso:'Hello'})}} >
                    <Text style={{fontSize:20, padding:10}}>Go To Detail</Text>
                </TouchableOpacity>
            </View>*/
        );
    }
}

var css = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
   
});