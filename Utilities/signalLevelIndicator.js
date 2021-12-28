import React, {Component} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';


export default class SignalLevelIndicator extends Component{

    constructor(){
        super()
        this.state= {
            strength:''
        }
    }

    componentDidMount() {
        if(this.props.signalStrength>-50){
            this.setState({strength:'3'});
        }if(this.props.signalStrength>-65 && this.props.signalStrength<=-50){
            this.setState({strength:'2'});
        }if(this.props.signalStrength>-80 && this.props.signalStrength<=-65){
            this.setState({strength:'1'});
        }if(this.props.signalStrength<=-80){
            this.setState({strength:'0'});
        }

    }


    render (){
        let strength;
        if(this.props.signalStrength>-50){
            strength='3';
        }if(this.props.signalStrength>-65 && this.props.signalStrength<=-50){
            strength='2';
        }if(this.props.signalStrength>-80 && this.props.signalStrength<=-65){
            strength='1';
        }if(this.props.signalStrength<=-80){
            strength='0';
        }

        if(strength=='0'){
            return(
                <View style={styles.indicator}>
                    {/*<Text style={{fontSize: 20, textAlign: 'center', color: '#333333', padding: 30}}>{this.state.strength}</Text>*/}
                    <View style={styles.bar0}/>
                    <View style={[styles.bar1,{backgroundColor:'gray'}]}/>
                    <View style={[styles.bar2,{backgroundColor:'gray'}]}/>
                    <View style={[styles.bar3,{backgroundColor:'gray'}]}/>
                </View>
            );
        }
        if(strength=='1'){
            return(
                <View style={styles.indicator}>
                    {/*<Text style={{fontSize: 20, textAlign: 'center', color: '#333333', padding: 30}}>{this.state.strength}</Text>*/}
                    <View style={styles.bar0}/>
                    <View style={styles.bar1}/>
                    <View style={[styles.bar2,{backgroundColor:'gray'}]}/>
                    <View style={[styles.bar3,{backgroundColor:'gray'}]}/>
                </View>
            );
        }
        if(strength=='2'){
            return(
                <View style={styles.indicator}>
                    {/*<Text style={{fontSize: 20, textAlign: 'center', color: '#333333', padding: 30}}>{this.state.strength}</Text>*/}
                    <View style={styles.bar0}/>
                    <View style={styles.bar1}/>
                    <View style={styles.bar2}/>
                    <View style={[styles.bar3,{backgroundColor:'gray'}]}/>
                </View>
            );
        }
        if(strength=='3'){
            return(
                <View style={styles.indicator}>
                    {/*<Text style={{fontSize: 20, textAlign: 'center', color: '#333333', padding: 30}}>{this.state.strength}</Text>*/}
                    <View style={styles.bar0}/>
                    <View style={styles.bar1}/>
                    <View style={styles.bar2}/>
                    <View style={styles.bar3}/>
                </View>
            );
        }else{
            return(
                <View style={styles.indicator}>
                    {/*<Text style={{fontSize: 20, textAlign: 'center', color: '#333333', padding: 30}}>{this.state.strength}</Text>*/}
                    <View style={[styles.bar0,{backgroundColor:'gray'}]}/>
                    <View style={[styles.bar1,{backgroundColor:'gray'}]}/>
                    <View style={[styles.bar2,{backgroundColor:'gray'}]}/>
                    <View style={[styles.bar3,{backgroundColor:'gray'}]}/>
                </View>
            );
        }


    }
}

const styles = StyleSheet.create({
    indicator:{
        marginHorizontal:25,
        flexDirection:'row'
    },
    bar1:{
        backgroundColor:'black',
        width:4,
        height:10,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:40,
        marginHorizontal:1,
        borderRadius:2
    },
    bar2:{
        backgroundColor:'black',
        width:4,
        height:15,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:35,
        marginHorizontal:1,
        borderRadius:2
    },
    bar3:{
        backgroundColor:'black',
        width:4,
        height:20,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,
        marginHorizontal:1,
        borderRadius:2
    },
    bar0:{
        backgroundColor:'black',
        width:4,
        height:5,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:45,
        marginHorizontal:1,
        borderRadius:2
    }
});
