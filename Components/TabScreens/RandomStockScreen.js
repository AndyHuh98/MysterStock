import {useState} from 'react';
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';

export default function RandomStockScreen(props) {
  return (
    <Container style={styles.container}>
      <Content>
        <Text>Random Stock Screen</Text>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
