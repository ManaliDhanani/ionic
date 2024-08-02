import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { GoogleAuthProvider } from 'firebase/auth';
import { from, Observable } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {

    public gapiInitialized: boolean = false;
    private tokenClient: any;

    constructor(
        // private afAuth: AngularFireAuth
    ) {
        // this.loadGapiClient().then(() => this.initClient());
        this.initClient();
    }

//   loadGapiClient(): Promise<void> {
//     return new Promise((resolve) => {
//       if (typeof google === 'undefined') {
//         const script = document.createElement('script');
//         script.src = 'https://apis.google.com/js/api.js';
//         script.onload = () => {
//           resolve();
//         };
//         document.body.appendChild(script);
//       } else {
//         resolve();
//       }
//     });
//   }

private initClient(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!this.gapiInitialized) {
            this.tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: '414167519215-4kmqsi1jcrdrddte9kvq360vs2c635pm.apps.googleusercontent.com',
                scope: 'https://www.googleapis.com/auth/calendar.events',
                callback: (response: any) => {
                    if (response.error) {
                        reject(response);
                    } else {
                        this.gapiInitialized = true;
                        resolve();
                    }
                }
            });
        } else {
            resolve();
        }
    });
}

signIn(): Observable<any> {
    return new Observable((observer) => {
        this.tokenClient.requestAccessToken();
        this.tokenClient.callback = (response: any) => {
            if (response.error) {
                observer.error(response);
            } else {
                observer.next(response);
                observer.complete();
            }
        };
    });
}

//   signOut() {
//     return from(this.afAuth.signOut());
//   }

  addEvent(event: any): Observable<any> {
    return new Observable((observer) => {
      if (!this.gapiInitialized) {
        observer.error('GAPI client is not initialized.');
        return;
      }
      google.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      }).then((response: any) => {
        console.log('Event added to Google Calendar', response);
        observer.next(response);
        observer.complete();
      }).catch((error: any) => {
        console.error('Error adding event to Google Calendar', error);
        observer.error(error);
      });
    });
  }
}
