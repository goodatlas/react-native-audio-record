declare module "react-native-audio-record" {
  export interface IAudioRecord {
    init: (options: Options) => void
    start: (playbackOptions: PlaybackOptions) => void
    stop: () => Promise<string>
    on: (event: "data", callback: (data: string) => void) => void
  }

  export interface Options {
    sampleRate: number
    /**
     * - `1 | 2`
     */
    channels: number
    /**
     * - `8 | 16`
     */
    bitsPerSample: number
    /**
     * - `6`
     */
    audioSource?: number
    wavFile: string
  }

  // Only these categories are really necessary for this library. Others do not allow recording at all.
  enum Category {
    Record = "Record",
    PlayAndRecord = "PlayAndRecord",
    MultiRoute = "MultiRoute",
  }

  export interface PlaybackOptions {
    playbackType: Category
    allowHaptics: boolean
  }

  const AudioRecord: IAudioRecord;

  export default AudioRecord;
}
