import { Injectable } from "@angular/core";
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { Platform } from "@ionic/angular";
import { Device } from '@capacitor/device';
import { filter } from "rxjs/operators";
import { environment } from "src/environments/environment";

import "@capacitor-community/firebase-analytics";

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {

    analyticsEnabled = true;

    constructor( private router: Router, private platform: Platform ){
        this.initFB();
        this.router.events.pipe(
            filter((e: any) => e instanceof NavigationEnd),
          ).subscribe((e: RouterEvent) => {
            console.log('route changed: ', e.url);
            this.setScreenName(e.url)
          });
    }

    async initFB(){
        if((await Device.getInfo()).platform == 'web'){
            console.log('web');
            FirebaseAnalytics.initializeFirebase(environment.firebaseConfig);
        }
        else if (this.platform.is('hybrid')) {
            console.log('Initializing Firebase for native');
            await FirebaseAnalytics.setCollectionEnabled({ enabled: this.analyticsEnabled });
        }
    }

    setUser() {
        FirebaseAnalytics.setUserId({
          userId: "test_123",
        });
      }
    
      setProperty() {
        FirebaseAnalytics.setUserProperty({
          name: "framework",
          value: "angular",
        });
      }
    
      logEvent(name: string, params?: { [key: string]: any }) {
        FirebaseAnalytics.logEvent({
          name,
          params
        });
      }
    
      setScreenName(screenName) {
        FirebaseAnalytics.setScreenName({
          screenName
        });
      }
    
      toggleAnalytics() {
        this.analyticsEnabled = !this.analyticsEnabled;
        FirebaseAnalytics.setCollectionEnabled({
          enabled: this.analyticsEnabled,
        });
      }
}