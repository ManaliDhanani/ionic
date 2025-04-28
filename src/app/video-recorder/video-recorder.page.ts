import { Component, OnInit } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { CaptureImageOptions, MediaCapture } from '@awesome-cordova-plugins/media-capture/ngx';
import { CapacitorVideoPlayer } from 'capacitor-video-player';

@Component({
  selector: 'app-video-recorder',
  templateUrl: './video-recorder.page.html',
  styleUrls: ['./video-recorder.page.scss'],
})
export class VideoRecorderPage implements OnInit {

  video: any;
  videoGallery: any[] = [];

  constructor(
    private mediaCapture: MediaCapture,
    private file: File
  ) { }

  ngOnInit() {
  }

  async startRecording() {
    try {
      let options: CaptureImageOptions = { limit: 1 }
      const data = await this.mediaCapture.captureVideo(options);
      const video = data[0];
      console.log('this.video: ', this.video);
      let dir = video.localURL.split('/');
      dir.pop();
      let fromDir = dir.join('/');
      let toDir = this.file.dataDirectory;
      const response = await this.file.copyFile(fromDir, video.name, toDir, video.name);
      console.log(response);
      const videoPath = this.file.dataDirectory + video.name;
      this.videoGallery.push({
        name: video.name,
        path: videoPath
      });
      console.log('Video saved to gallery:', videoPath);

    } catch(e) {
      console.log(e);
    }
  }

  async playRecording(path: string) {
    try {
      console.log('Playing video from path:', path);
      await CapacitorVideoPlayer.initPlayer({
        mode: 'fullscreen',
        url: path,
        playerId: 'fullscreen',
        componentTag: 'app-home'
      });
    } catch (error) {
      console.log('Error playing video:', error);
    }  
  }

}
