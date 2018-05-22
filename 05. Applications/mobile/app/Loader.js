import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

export default function Loader({ text, color = '#457B9D', size = 'large' }) {
  return (
    <View style={styles.loader}>
      <Text style={[styles.loaderText, { color }]}>{text}</Text>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    marginBottom: 16,
    fontSize: 32,
  },
});
