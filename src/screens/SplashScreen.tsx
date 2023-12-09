import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {navigateAndSimpleReset} from '../navigation/NavigationRoutes';

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      // Navigate the app's main screen  after the splash screen duration
      navigateAndSimpleReset('barcodescreen');
    }, 3000); // Simulating a 3-second splash screen duration
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/QR-Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.task}>QR Code Task</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  task: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
});
