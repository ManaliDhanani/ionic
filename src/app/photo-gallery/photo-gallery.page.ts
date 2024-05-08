import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.page.html',
  styleUrls: ['./photo-gallery.page.scss'],
})

export class PhotoGalleryPage implements OnInit {

  constructor(
    public photoService: PhotoService
  ) { }

  async ngOnInit() {
    await this.photoService.loadSaved();
    // this.photoService.clearPhotosFromStorage();
  }

  addPhotoToGallery(){
    this.photoService.addNewToGallery();
  }
}