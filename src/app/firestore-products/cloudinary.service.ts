// src/app/services/cloudinary.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CloudinaryService {
  private cloudName = 'dihloaorh';
  private uploadPreset = 'angular_unsigned';

  uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    return fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => data.secure_url)
    .catch(err => {
      console.error('Cloudinary upload error:', err);
      throw err;
    });
  }
}
