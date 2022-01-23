import React, {useState} from 'react';
import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { TextInput, Button, Avatar } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';


export default function Login({navigation}) {

  //useState using

  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [passStatus, setPassStatus]=useState(true)

  //create function
  const fncLogin = ()=>{
    //setPassStatus(false)
    if(email==""){
      Alert.alert('E-mail is not empty!')
    }else if(password==""){
      Alert.alert('Password is not empty!')
    }else{
      //https://www.jsonbulut.com/json/userRegister.php?ref=c7c2de28d81d3da4a386fc8444d574f2&userName=demo&userSurname=demo&userPhone=05333333333&userMail=a@a.com&userPass=123456
      const url = 'https://www.jsonbulut.com/json/userLogin.php'
      const params = {
        ref: 'c7c2de28d81d3da4a386fc8444d574f2',
        userEmail: email,
        userPass: password,
        face: 'no'
      }
      Axios.get(url, { params: params }).then( res => {
        
        const u = res.data.user[0]
        const durum = u.durum
        const message = u.mesaj

        if ( durum == true ) {
          // sayfa geçişi yap
          navigation.navigate("Product")
        }else {
          Alert.alert(message)
        }
          })
    }
    console.log("fncLogin call",email,password)
  }

  return (
    <View style={styles.container}>

    <ScrollView>

      <View  style={{alignSelf:'center', marginTop:30}} >
        <Avatar.Image size={100} source={require('./assets/3561840_emoji_emoticon_expression_annoyed_icon.png')} style={{backgroundColor:'#fff'}} />
      </View>

      <Text style={styles.txtTitle}>User Login</Text>

      <TextInput
        style={styles.txtFiled}
        label="E-mail"
        value={email}
        onChangeText={text => setEmail(text)}
        mode='outlined'
        keyboardType='email-address'
        autoCapitalize='none'
      />

      <TextInput
        style={styles.txtFiled}
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        mode='outlined'
        secureTextEntry={passStatus}
      />

      <View style={styles.cardView}>
        <Button mode='contained' icon='login' onPress={()=> fncLogin()} style={styles.btnStyle}>
          Login
        </Button>

        <Button mode='contained' icon='account-arrow-right' onPress={()=> navigation.navigate('Register')} style={styles.btnStyle}>
          Register
        </Button>
      </View>
      

      </ScrollView>


    <View style={styles.footerCard}>
      <Text style={styles.footerCardText}> Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
      </Text>
      <AwesomeIcon name='rocket' size={30} style={{textAlign:'center'}} color='#8E6D9E'  />
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  txtTitle:{
    fontSize:30,
    textAlign:'center',
    marginTop:10,
    color:'#B22EF5',
    marginBottom:20,
  },
  btnStyle:{
    marginTop:20,
    padding:10,
    
  },
  txtFiled:{
    marginTop:10,
  },
  cardView:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  footerCard:{
    margin:10,
  },
  footerCardText:{
    textAlign:'center',
  }
});
