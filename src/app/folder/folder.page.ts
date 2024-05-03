import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';
import { ToastService } from '../services/toastr.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  public data = [
    'Amsterdam',
    'Buenos Aires',
    'Cairo',
    'Geneva',
    'Hong Kong',
    'Istanbul',
    'London',
    'Madrid',
    'New York',
    'Panama City',
    'Istanbul',
    'London',
    'Madrid',
    'New York',
  ];
  public results = [...this.data];
  date2: Date | undefined;
  

  constructor(
    private modalController: ModalController,
    private toastrService: ToastService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      // subHeader: 'Subtitle',
      message: 'Are you sure you want to open dialog box?',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.openModal();
          }
        },
      ]
    });

    await alert.present();
  }

  async openModal(){
    const modal = await this.modalController.create({
      component: ModalPage,
    });
    return await modal.present();
  }

  successToastr(){
    this.toastrService.successToast("This is success toast");
  }

  errorToastr(){
    this.toastrService.errorToast("This is error toast");
  }

  handleInput(value) {
    const query = value.toLowerCase();
    this.results = this.data.filter((d) => d.toLowerCase().includes(query));
  }
}