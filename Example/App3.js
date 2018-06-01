import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import { AudioPlayer } from 'react-native-audio-player-recorder';
import AudioRecord from 'react-native-audio-record';

export default class App extends Component {
  sound = null;
  state = {
    audioFile: '',
    recording: false,
    loaded: false,
    paused: true
  };

  async componentDidMount() {
    await this.checkPermission();
    this.initAudioRecord();
    this.initAudioPlayer();
  }

  checkPermission = async () => {
    const p = await Permissions.check('microphone');
    console.log('permission check', p);
    if (p === 'authorized') return;
    this.requestPermission();
  };

  requestPermission = async () => {
    const p = await Permissions.request('microphone');
    console.log('permission request', p);
  };

  initAudioRecord = () => {
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav'
    };

    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64');
      // do something with audio chunk
    });
  };

  initAudioPlayer = () => {
    AudioPlayer.onFinished = () => {
      console.log('finished playback');
      this.setState({ paused: true, loaded: false });
    };
    AudioPlayer.setFinishedSubscription();

    AudioPlayer.onProgress = data => {
      console.log('progress', data);
    };
    AudioPlayer.setProgressSubscription();
  };

  start = () => {
    console.log('start record');
    this.setState({ audioFile: '', recording: true, loaded: false });
    AudioRecord.start();
  };

  stop = async () => {
    if (!this.state.recording) return;
    console.log('stop record');
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    this.setState({ audioFile, recording: false });
  };

  play = () => {
    if (this.state.loaded) {
      AudioPlayer.unpause();
      this.setState({ paused: false });
    } else {
      AudioPlayer.play(this.state.audioFile);
      this.setState({ paused: false, loaded: true });
    }
  };

  pause = () => {
    AudioPlayer.pause();
    this.setState({ paused: true });
  };

  render() {
    const { recording, paused, audioFile } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Button onPress={this.start} title="Record" disabled={recording} />
          <Button onPress={this.stop} title="Stop" disabled={!recording} />
          {paused ? (
            <Button onPress={this.play} title="Play" disabled={!audioFile} />
          ) : (
            <Button onPress={this.pause} title="Pause" disabled={!audioFile} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});
