import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SocialSharingPageRoutingModule } from './social-sharing-routing.module';
import { SocialSharingPage } from './social-sharing.page';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialSharingPageRoutingModule
  ],
  declarations: [SocialSharingPage],
  providers: [
    AndroidPermissions,
    SocialSharing,
    FileChooser,
    FilePath,
    Chooser
  ]
})
export class SocialSharingPageModule {}
