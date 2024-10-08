import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from "@capacitor/push-notifications";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    public platForm: Platform,
    public metaService: Meta
  ) {
    if(this.platForm.is('android')){
      this.initNotification();
    }else {}
  }

  ngOnInit(){

    // this.metaService.removeTag("property='og:url'");
    // this.metaService.removeTag("property='og:image'");
    // this.metaService.addTag({ property: 'og:url', content: 'https://angularhttpclient-d6c80.web.app' });
    // this.metaService.addTag({ property: 'og:image', content: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBzBi45HXAbgiDwur_NYpYHzWaccngbhyQvA&s' });

    // console.log('Meta tags updated:', this.metaService.getTag("property='og:url'"), this.metaService.getTag("property='og:image'"));

  }

  initNotification(){

    PushNotifications.requestPermissions().then(result => {
      if(result.receive == 'granted'){
        PushNotifications.register();
      } else {
        console.error('Push notification permission denied');
      }
    });

    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log('Push registration success, token: ' + token.value);
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.error('Push registration error: ', error);
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ', notification);
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ', notification);
      }
    );

    PushNotifications.getDeliveredNotifications().then(notificationList => {
      console.log('Delivered notifications', notificationList);
    })
  }
}
