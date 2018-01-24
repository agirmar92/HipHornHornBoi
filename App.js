import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, StatusBar, Alert, TouchableOpacity, Image } from 'react-native';
import { Audio, Asset, ScreenOrientation, Font, AppLoading } from 'expo';

export default class App extends Component {
  state = {
    isReady: false
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/horn.png'),
        require('./assets/yeahboi.mp3')
      ]),
      Font.loadAsync({
        Lobster: require('./assets/fonts/LobsterTwo-Regular.ttf')
      })
    ]);
  }

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
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.mainContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>Boi</Text>
          </View>
          <View style={styles.lowerContainer}>
            <TouchableOpacity
              onPress={this._playSound}
              style={styles.hornContainer} >
              <Image
                style={styles.horn}
                source={require('./assets/horn.png')}
              />
            </TouchableOpacity>
          </View>
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
    flexDirection: 'column',
    backgroundColor: '#33658A',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    color: '#86BBD8',
    fontSize: 130,
    fontFamily: 'Lobster',
    width: 'auto'
  },
  lowerContainer: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  hornContainer: {
    width: '100%',
    maxWidth: '65%'
  },
  horn: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});
