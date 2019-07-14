declare module "react-native-audio-record" {
  export interface IAudioRecord {
    init: (options: Options) => void
    start: () => void
    stop: () => Promise<string>
    on: (event: "data", callback: (data: string) => void) => void
  }

  export interface Options {
    sampleRate: number
    channels: number // 1 | 2
    bitsPerSample: number // 8 | 16
    audioSource?: number // 6
    wavFile: string
  }

  const AudioRecord: IAudioRecord

  export default AudioRecord;
}
