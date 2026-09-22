import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private mediaStream?: MediaStream;

  // ===========
  // Get camera/microphone
  // ===========

  async getLocalStream(video: boolean): Promise<MediaStream> {
    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video,
    });

    return this.mediaStream;
  }

  // =============
  // Mute microphone
  // =============

  toggleMute(): boolean {
    if (!this.mediaStream) {
      return false;
    }

    const audioTracks = this.mediaStream.getAudioTracks();

    if (!audioTracks.length) {
      return false;
    }

    const newState = !audioTracks[0].enabled;

    audioTracks.forEach((track) => {
      track.enabled = newState;
    });

    return !newState;
  }

  // ============
  // Camera
  // ============

  toggleCamera(): boolean {
    if (!this.mediaStream) {
      return false;
    }

    const videoTracks = this.mediaStream.getVideoTracks();

    if (!videoTracks.length) {
      return false;
    }

    const newState = !videoTracks[0].enabled;

    videoTracks.forEach((track) => {
      track.enabled = newState;
    });

    return !newState;
  }

  // =============
  // Stop call
  // =============

  stopCall(): void {
    if (!this.mediaStream) {
      return;
    }

    this.mediaStream.getTracks().forEach((track) => {
      track.stop();
    });

    this.mediaStream = undefined;
  }
}
