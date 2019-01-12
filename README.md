
# react-native-audio-record
Audio record buffers for iOS and Android.

## Install
```
yarn add react-native-audio-record
react-native link react-native-audio-record
```

## Usage
```js
import AudioRecord from 'react-native-audio-record';

const options = {
  sampleRate: 16000,  // default 44100
  channels: 1,        // 1 or 2, default 1
  bitsPerSample: 16,  // 8 or 16, default 16
  audioSource: 6,     // android only (see below)
  wavFile: 'test.wav' // default 'audio.wav'
};

AudioRecord.init(options);

AudioRecord.start();

AudioRecord.stop();
// or to get the wav file path
audioFile = await AudioRecord.stop();

AudioRecord.on('data', data => {
  // base64-encoded audio data chunks
});
```

For `audioSource` use one of the constant values from [here](https://developer.android.com/reference/android/media/MediaRecorder.AudioSource). Default value is 6 (`VOICE_RECOGNITION`).

Use 3rd-party module like [buffer](https://www.npmjs.com/package/buffer) to decode base64 data. Example -
```js
// yarn add buffer
import { Buffer } from 'buffer';
chunk = Buffer.from(data, 'base64');
```
Don't forget to add microphone permission in your app.

## Example
`Example` folder contain sample apps for recording (using this module) and playback (using 3rd party modules)
- `App1.js` - uses [react-native-sound](https://github.com/zmxv/react-native-sound) for playback and pause
- `App2.js` - uses [react-native-video](https://github.com/react-native-community/react-native-video) for playback, pause and report progress
- `App3.js` - uses [react-native-audio-player-recorder](https://github.com/Shinetechchina/react-native-audio-player-recorder) for playback, pause and report progress

## Credits/References
I'm not a native app developer. Most of the code is taken from online resources.
- iOS [Audio Queues](https://developer.apple.com/library/content/documentation/MusicAudio/Conceptual/AudioQueueProgrammingGuide)
- Android [AudioRecord](https://developer.android.com/reference/android/media/AudioRecord.html)
- [cordova-plugin-audioinput](https://github.com/edimuj/cordova-plugin-audioinput)
- [react-native-recording](https://github.com/qiuxiang/react-native-recording)
- [SpeakHere](https://github.com/shaojiankui/SpeakHere)
- [ringdroid](https://github.com/google/ringdroid)
