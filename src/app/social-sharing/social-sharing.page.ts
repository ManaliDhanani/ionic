import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Platform } from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ToastService } from '../services/toastr.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { FileSharer } from '@byteowls/capacitor-filesharer';

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
    private socialSharing: SocialSharing,
    private platform: Platform,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private toastService: ToastService,
    private androidPermissions: AndroidPermissions,
    private chooser: Chooser
  ) { }

  ngOnInit() {
    // this.checkPermissions();
  }

  // checkPermissions() {
  //   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
  //     result => {
  //       if (!result.hasPermission) {
  //         this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
  //       }
  //     },
  //     error => {
  //       console.error('Error checking permissions', error);
  //     }
  //   );

  //   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
  //     result => {
  //       if (!result.hasPermission) {
  //         this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
  //       }
  //     },
  //     error => {
  //       console.error('Error checking permissions', error);
  //     }
  //   );
  // }

  chooseAndShareFile() {
    if (this.platform.is('cordova')) {
      this.fileChooser.open().then((uri) => {
        this.filePath.resolveNativePath(uri).then((filePath) => {
          console.log('Resolved file path:', filePath);
          this.shareFile(filePath);
        }).catch((err) => {
          console.error('Error resolving file path', err);
        });
      }).catch((e) => {
        console.error('Error opening file chooser', e);
      });
    } else {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      fileInput.click();
    }
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.shareFile();
    }
  }

  shareFile(file?: string) {
    if (this.platform.is('cordova')) {
      if(file){
        this.socialSharing.share(null, null, file, null).then(() => {
          this.toastService.successToast('File shared successfully');
        }).catch((error) => {
          console.error('Error sharing file', error);
        });
      }else {
        console.error('File path is undefined');
      }
    } else {
      if (navigator.share) {
        const fileToShare = this.selectedFile instanceof File ? this.selectedFile : new File([this.selectedFile], 'shared-file', { type: (this.selectedFile as File).type });
        navigator.share({
          files: [fileToShare],
          title: 'Share File',
          text: 'Sharing this file with you.'
        }).then(() => {
          console.log('File shared successfully');
        }).catch((error) => {
          console.error('Error sharing file', error);
        });
      } else {
        console.log('Web share API is not supported in this browser.');
        alert('Web share API is not supported in this browser.');
      }
    }
  }

  async shareScreenShot(){
    const pageContainer = document.getElementById('page-container');
    if (pageContainer) {
      const canvas = await html2canvas(pageContainer);
      const dataUrl = canvas.toDataURL('image/png');
      console.log('dataUrl: ', dataUrl);
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'screen-shot.png', { type: 'image/png' });

      if (this.platform.is('cordova')) {
        this.socialSharing.share(null, null, dataUrl, null)
          .then(() => {
            console.log('Share successful');
          })
          .catch((error) => {
            console.error('Error sharing', error);
          });
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

  chooseFile(){
    this.chooser.getFile().then((res) => {
      this.shareChoseFile(res.path, res.name, res.mimeType);
    }, (error) => {
      console.error("error while get file: ", error);
    })
  }

  shareChoseFile(base64: any, name: any, type: any){
    console.log('base64: ', base64);
    console.log('name: ', name);
    console.log('type: ', type);
    try {
      FileSharer.share({
        filename: name,
        base64Data: base64.split(",")[1],
        contentType: type,
      }).then(() => {

      }).catch(error => {
        console.error("error sharing file: ", error);
      })
    } catch (err) {
      console.error("err::", err);
    }
  }

}
