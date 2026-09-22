import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CallService } from '../../services/call';

export type CallType = 'audio' | 'video';

@Component({
  selector: 'app-call-screen',
  standalone: true,
  templateUrl: './call-screen.html',
})
export class CallScreen implements AfterViewInit, OnDestroy {
  private callService = inject(CallService);

  // ============
  // Inputs
  // ============

  callType = input<CallType | null>(null);

  user = input<any | null>(null);

  // =============
  // Outputs
  // =============

  close = output<void>();

  // =============
  // Video elements
  // =============

  @ViewChild('localVideo')
  localVideo!: ElementRef<HTMLVideoElement>;

  @ViewChild('remoteVideo')
  remoteVideo!: ElementRef<HTMLVideoElement>;

  // =========
  // UI state
  // =========

  isMuted = signal(false);
  isCameraOff = signal(false);
  isSpeakerOn = signal(true);
  duration = signal('00:00');

  private timer?: ReturnType<typeof setInterval>;

  // ============================
  // Lifecycle
  // ============================

  ngAfterViewInit(): void {
    this.startCallMedia();

    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();

    this.callService.stopCall();
  }

  // ============
  // Start media
  // ============

  private async startCallMedia(): Promise<void> {
    try {
      const stream = await this.callService.getLocalStream(this.callType() === 'video');

      if (this.localVideo) {
        this.localVideo.nativeElement.srcObject = stream;
      }
    } catch (error) {
      console.error('Unable to access camera/microphone:', error);
    }
  }

  // ============================
  // Mute
  // ============================

  toggleMute(): void {
    const muted = this.callService.toggleMute();

    this.isMuted.set(muted);
  }

  // ============================
  // Camera
  // ============================

  toggleCamera(): void {
    const cameraOff = this.callService.toggleCamera();

    this.isCameraOff.set(cameraOff);
  }

  // ============================
  // Speaker
  // ============================

  toggleSpeaker(): void {
    this.isSpeakerOn.update((value) => !value);

    if (this.remoteVideo) {
      this.remoteVideo.nativeElement.muted = !this.isSpeakerOn();
    }
  }

  // ============
  // End call
  // ============

  closeCallScreen(): void {
    this.callService.stopCall();

    this.close.emit();
  }

  // ==============
  // Timer
  // ==============

  private startTimer(): void {
    let seconds = 0;

    this.timer = setInterval(() => {
      seconds++;

      const minutes = Math.floor(seconds / 60);

      const remainingSeconds = seconds % 60;

      this.duration.set(
        `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`,
      );
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
