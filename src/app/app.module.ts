import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationPage } from './navigation/navigation.page';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Calendar } from '@ionic-native/calendar/ngx';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment'; 
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
// import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
// import { FileChooser } from '@ionic-native/file-chooser/ngx';
// import { FilePath } from '@ionic-native/file-path/ngx';

initializeApp(environment.firebaseConfig);
const analytics = getAnalytics();
const auth = getAuth();

@NgModule({
  declarations: [AppComponent, NavigationPage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Calendar,
    // SocialSharing,
    // FilePath,
    // FileChooser,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  // constructor() {
  //   // Initialize Firebase
  //   initializeApp(environment.firebaseConfig);
  //   const analytics = getAnalytics();
  // }
}
