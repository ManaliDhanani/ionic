import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor, Plugins } from '@capacitor/core';
const { FilesystemExtra } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';

  constructor() { }

  // public async clearPhotosFromStorage() {
  //   try {
  //     for (const photo of this.photos) {
  //       await Filesystem.deleteFile({
  //         path: photo.filepath,
  //         directory: Directory.Data
  //       });
  //     }
  //     this.photos = [];
  //     await Preferences.set({
  //       key: this.PHOTO_STORAGE,
  //       value: JSON.stringify(this.photos)
  //     });
  //   } catch (error) {
  //     console.error('Error clearing photos:', error);
  //   }
  // }

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    const savedImageFile: any = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);

    if (Capacitor.getPlatform() === 'android') {
      await this.saveToGallery(savedImageFile.filepath);
    }

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
  }

  private async saveToGallery(filepath: string) {
    try {
      const savedFile = await FilesystemExtra['copy']({
        from: filepath,
        to: 'gallery',
        directory: Directory.Data
      });
      console.log('Saved to gallery:', savedFile.uri);
    } catch (error) {
      console.error('Error saving to gallery:', error);
    }
  }

  private async savePicture(photo: Photo) {
    const base64Data: any = await this.readAsBase64(photo);
    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }

  public async loadSaved() {
    const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
    this.photos = (value ? JSON.parse(value) : []) as UserPhoto[];
    
    for (let photo of this.photos) {
      const readFile = await Filesystem.readFile({
        path: photo.filepath,
        directory: Directory.Data,
      });
      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
  }

  private async readAsBase64(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
