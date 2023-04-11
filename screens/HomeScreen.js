import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View,} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = useState();
  const [countexercisesTotal, setcountexercisesTotal] = useState(0);
  const [countplansTotal, setCountPlansTotal] = useState(0);
  useEffect(() => {
    getUserData();
  }, []);

  //Obter dados do usuario da Async
  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const getcountexercisesTotal = async () => {
    const value = await AsyncStorage.getItem("countexercisesTotal");
    const countExercises = await AsyncStorage.getItem("countExercises");
    const updatedValue = (parseInt(value) || 0) + (parseInt(countExercises) || 0 );
    setcountexercisesTotal(updatedValue);
  };

  const getcountplansTotal = async () => {
    const value1 = await AsyncStorage.getItem("countplansTotal");
    const countPlans = await AsyncStorage.getItem("countPlans");
    const updatedValue = (parseInt(value1) || 0) + (parseInt(countPlans) || 0 );
    setCountPlansTotal(updatedValue);
  };
    


    //Atualizar sempre que a tela é carregada
    useFocusEffect(
    React.useCallback(() => {
    getcountexercisesTotal();
    getcountplansTotal();
    }, [])
    );

 

  //Abrir Tela lateral
  const handleMenuPress = () => {
    navigation.openDrawer();
  };



    return (    
    <View style={{backgroundColor:"#2E9AFE",height:"14%" }}>
      <TouchableOpacity onPress={handleMenuPress} style={{ position: 'absolute', top: 43, left: 10 }}>
        <Ionicons name="menu-outline" size={48} color="black" />
      </TouchableOpacity>
        <Text style={{color:"black",marginLeft:60, marginRight:"auto",textAlign:"left", fontSize:24, Margintop:48 , fontWeight:"bold",top:40}}>Olá, {userDetails?.fullname}</Text>
        <Text style={{color:"black",marginLeft:62, marginRight:"auto",textAlign:"left", fontSize:18, top:48}}>Vamos lá treinar!</Text>

        <Text style={{color:"black",marginLeft:71, marginRight:"auto", fontSize:18, top:75}}>Exercicios</Text>
        <Text style={{color:"black",marginLeft:84, marginRight:"auto", fontSize:52, top:84 ,fontWeight:"bold"}}>{countexercisesTotal}</Text>
        <Text style={{color:"black",marginLeft:68, marginRight:"auto", fontSize:18, top:95}}>Finalizados</Text>

        <Text style={{color:"black",marginLeft:265, marginRight:"auto", fontSize:18, bottom:42}}>Planos</Text>
        <Text style={{color:"black",marginLeft:263, marginRight:"auto", fontSize:52, bottom:34 ,fontWeight:"bold"}}>{countplansTotal}</Text>
        <Text style={{color:"black",marginLeft:250, marginRight:"auto", fontSize:18, bottom:23}}>Finalizados</Text> 


      </View>
    );
  }
  
  export default HomeScreen

  const style = StyleSheet.create({})