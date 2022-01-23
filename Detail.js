import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Badge,
} from 'react-native-paper';

export default function Detail({ navigation, route }) {
  const item = route.params?.item;

  console.log(item);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card>
          <Card.Cover source={{ uri: item.images[0].normal }} />
        </Card>
        <Title style={{ textAlign: 'center' }}>{item.productName}</Title>
        <Badge size={30}>{item.price}€</Badge>

        <Paragraph style={{ marginTop: 20 }}>{item.description}</Paragraph>
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
});
