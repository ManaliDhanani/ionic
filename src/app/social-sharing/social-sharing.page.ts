import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import html2canvas from 'html2canvas';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FileSharer } from '@byteowls/capacitor-filesharer';
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'app-social-sharing',
  templateUrl: './social-sharing.page.html',
  styleUrls: ['./social-sharing.page.scss'],
})
export class SocialSharingPage implements OnInit {

  selectedFile: File | null = null;
  photoUrl: string | undefined;
  selectedFileUri: string | null = null;

  constructor(
    public platform: Platform
  ) { }

  ngOnInit() {}

  chooseAndSharePhoto() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('this.selectedFile: ', this.selectedFile);
    }
  }

  shareFile() {
    if (navigator.share) {
      console.log('navigator.share: ', navigator.share);
      const fileToShare = this.selectedFile instanceof File ? this.selectedFile : new File([this.selectedFile], 'shared-file', { type: (this.selectedFile as File).type });
      console.log('fileToShare: ', fileToShare);
      navigator.share({
        files: [fileToShare],
        title: null,
        text: null
      }).then(() => {
        console.log('File shared successfully');
        this.selectedFile = null;
      }).catch((error) => {
        console.error('Error sharing file', error);
      });
    } else {
      console.log('Web share API is not supported in this browser.');
      alert('Web share API is not supported in this browser.');
    }
  }

  async shareScreenShot(){
    const pageContainer = document.getElementById('page-container');
    if (pageContainer) {
      const canvas = await html2canvas(pageContainer);
      const dataUrl = canvas.toDataURL('image/png');
      console.log('dataUrl: ', dataUrl);
      const blob = await (await fetch(dataUrl)).blob();
      console.log('blob: ', blob);
      const file = new File([blob], 'screen-shot.png', { type: 'image/png' });
      console.log('file: ', file);

      if (this.platform.is('cordova')) {
        try {
          const savedFile = await Filesystem.writeFile({
            path: 'screenshot.png',
            data: dataUrl.split(',')[1],
            directory: Directory.Cache,
          });
          console.log('savedFile: ', savedFile);
          await Share.share({
            title: 'Check out this screen shot!',
            url: savedFile.uri,
            dialogTitle: 'Share with friends',
          });
        } catch (error) {
          console.error('Error sharing screen shot:', error);
        }
      } else {
        if (navigator.share) {
          try {
            await navigator.share({
              title: null,
              text: null,
              files: [file],
            });
            console.log('Share successful');
          } catch (error) {
            console.error('Error sharing', error);
          }
        } else {
          console.error('Web Share API not supported.');
        }
      }
    }
  }

  async sharePhoto(){
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
      });
      console.log('image: ', image);

      try {
        await Share.share({
          title: 'Check out this photo!',
          url: image.path || image.webPath,
          dialogTitle: 'Share with friends',
        });
      } catch (error) {
        console.error('Error sharing photo:', error);
      }

    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  }

  async shareFileAndroid() {
    try {
      const result = await FilePicker.pickFiles({
        types: ['application/pdf', 'application/octet-stream'],
        readData: true,
      });
      console.log('result: ', result);
  
      if (result.files.length > 0) {
        const file = result.files[0];
        console.log('file: ', file);
  
        await FileSharer.share({
          base64Data: file.data,
          filename: file.name,
          contentType: file.mimeType || 'application/octet-stream',
        });
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  }

}
