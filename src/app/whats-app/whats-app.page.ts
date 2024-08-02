import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-whats-app',
  templateUrl: './whats-app.page.html',
  styleUrls: ['./whats-app.page.scss'],
})
export class WhatsAppPage implements OnInit {

  constructor() { }

  async ngOnInit() {
    // const openCapacitorSite = async () => {
      await Browser.open({ url: 'http://capacitorjs.com/' });
    // };
  }

  // async ionViewDidEnter() {
  //   try {
  //     await Browser.open({ url: 'https://web.whatsapp.com' });
  //   } catch (error) {
  //     console.error('Failed to open WhatsApp Web:', error);
  //   }
  // }

}