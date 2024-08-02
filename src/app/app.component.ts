import { Component } from '@angular/core';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from "@capacitor/push-notifications";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    public platForm: Platform
  ) {
    if(this.platForm.is('android')){
      this.initNotification();
    }else {}
  }

  ngOnInit(){
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

  new(){}

}
