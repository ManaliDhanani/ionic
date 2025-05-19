import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from "@capacitor/push-notifications";
import { Platform } from '@ionic/angular';
import { LocalNotifications, PermissionStatus } from '@capacitor/local-notifications';
import { AppLauncher } from '@capacitor/app-launcher';
import { ToastService } from './services/toastr.service';
import { BackgroundMode } from '@anuradev/capacitor-background-mode';
import { LiveUpdate } from "@capawesome/capacitor-live-update";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    public platForm: Platform,
    public metaService: Meta,
    private toastrService: ToastService,
  ) {
    if(this.platForm.is('android')){
      this.sync();
      this.initNotification();
      this.initLocalNotifications();
    }
  }

  ngOnInit(){
  }

  async sync() {
    const result = await LiveUpdate.sync();
    console.log("result:", result);
    if (result.nextBundleId) {
      await LiveUpdate.reload();
    }
  };

  async initLocalNotifications() {
    const permissionStatus: PermissionStatus = await LocalNotifications.requestPermissions();
    
    if (permissionStatus.display === 'granted') {
      console.log('Local notification permission granted');
      this.toastrService.successToast('Local notification permission granted!');
      this.scheduleLocalNotification('Welcome!', 'Welcome to the plugin app!');
    } else {
      console.error('Local notification permission not granted');
      this.toastrService.errorToast('Local notification permission not granted!');
    }
    
    this.registerLocalNotificationListeners();
  }

  registerLocalNotificationListeners() {
    LocalNotifications.addListener('localNotificationReceived', (notification) => {
      console.log('Local Notification received: ', notification);
    });

    LocalNotifications.addListener('localNotificationActionPerformed', (notificationAction) => {
      console.log('Local Notification action performed: ', notificationAction);
    });
  }

  async scheduleLocalNotification(title: string, body: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Math.floor(Math.random() * 10000),
          title: 'Local notification 1',
          body,
          schedule: { at: new Date(Date.now() + 1000 * 20) },
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null,
        },
        {
          id: Math.floor(Math.random() * 10000),
          title: 'Local notification 2',
          body,
          schedule: { at: new Date(Date.now() + 1000 * 40) },
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null,
        },
      ],
    });
    console.log('Local notifications scheduled:');
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
        console.log('Push notification registration success, token: ' + token.value);
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.error('Push registration error: ', error);
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push notification received: ', notification);
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
