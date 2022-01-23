import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { TextInput, Button, Avatar } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Axios from 'axios';



export default function Register({navigation}) {
  const [userName, setName] = useState('');
  const [userSurname, setSurname] = useState('');
  const [userPhone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passStatus, setPassStatus] = useState(true);
  

  const emailCheck = (email) => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase());
  };
  
  const fncRegister = () => {
    if (email == '') {
      Alert.alert('E-Mail is not Empty!');
    } else if (emailCheck(email) == false) {
      Alert.alert('Please enter a valid email address!');
    } else {
      if (password == '') {
        Alert.alert('Password is not Empty!');
      } else if (password.length < 8) {
        Alert.alert('Password length cannot be less than eight characters!');
      } else {
        if (userName == '') {
          Alert.alert('User name is not Empty!');
        } else if (userSurname == '') {
          Alert.alert('User surname is not Empty!');
        } else if (userPhone == '') {
          Alert.alert('User phone is not Empty!');
        } else {

          const url='https://www.jsonbulut.com/json/userRegister.php'
          const params={
            ref:'c7c2de28d81d3da4a386fc8444d574f2',
            userName:userName,
            userSurname:userSurname,
            userPhone:userPhone,
            userMail:email,
            userPass:password
          }

          Axios.get(url,{params:params}).then(res=>{
            const u=res.data.user[0]
            const durum=u.durum
            const message=u.mesaj
            if(durum==true){
              Alert.alert("login ol")
              navigation.navigate("Login")
            }else{
              Alert.alert(message)
            }
            //console.log(res.data)
          })

        }
      }
    }
  };

  return (
    
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.txtTitle}>User Register</Text>

        <TextInput
          style={styles.txtFiled}
          label="User Name"
          value={userName}
          onChangeText={(text) => setName(text)}
          mode="outlined"
        />

        <TextInput
          style={styles.txtFiled}
          label="User Surname"
          value={userSurname}
          onChangeText={(text) => setSurname(text)}
          mode="outlined"
        />

        <TextInput
          style={styles.txtFiled}
          label="User Phone"
          value={userPhone}
          onChangeText={(text) => setPhone(text)}
          mode="outlined"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.txtFiled}
          label="E-mail"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.txtFiled}
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          mode="outlined"
          secureTextEntry={passStatus}
        />

        <View style={styles.cardView}>
          <Button
            mode="contained"
            icon="content-save"
            onPress={() => fncRegister()}
            style={styles.btnStyle}>
            Save
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  txtTitle: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
    color: '#B22EF5',
    marginBottom: 20,
  },
  btnStyle: {
    marginTop: 20,
    padding: 10,
    marginLeft: 150,
  },
  txtFiled: {
    marginTop: 10,
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
