import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, StatusBar, Alert, TouchableOpacity, Image } from 'react-native';
import { Audio, Asset, ScreenOrientation } from 'expo';

export default class App extends Component {
  constructor(props) {
    super(props);
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP);
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      interruptionModeAndroid: 1,
      interruptionModeIOS: 0,
      shouldDuckAndroid: true
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={this._playSound}>
            <Image
              style={styles.hornStyles}
              source={require('./assets/horn.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _playSound() {
    const soundObject = new Audio.Sound();
    soundObject.loadAsync(require('./assets/yeahboi.mp3')).then(
      data => soundObject.playAsync(),
      error => alert(error)
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#33658A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  white: {
    color: 'white'
  },
  hornStyles: {
    maxWidth: '50%',
    resizeMode: 'contain'
  }
});
