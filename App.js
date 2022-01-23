import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import pages
import Login from './Login';
import Register from './Register';
import Product from './Product';
import Detail from './Detail'

const Stack = createNativeStackNavigator();
function LoginStack () {
return (
<Stack.Navigator>
    <Stack.Screen name="Login" options={{ title: 'User Login' }} component={Login} />
    <Stack.Screen name="Register" options={{ title: 'User Register' }} component={Register} />
</Stack.Navigator>
)}

function ProductStack () {
  return (
<Stack.Navigator>
  <Stack.Screen name="loginStack" options={{ headerShown: false }} component={LoginStack} />
  <Stack.Screen name="Product"  options={{ title: 'Product', }} component={Product} />
  <Stack.Screen name="Detail"  options={{ title: 'Detail', }} component={Detail} />
</Stack.Navigator>
)}

const navigation =
<NavigationContainer>
  <ProductStack/>
</NavigationContainer>


export default function App() {
  return (
    navigation
  );
}

