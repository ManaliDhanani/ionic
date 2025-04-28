import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GoogleMapPageRoutingModule } from './google-map-routing.module';
import { GoogleMapPage } from './google-map.page';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapPageRoutingModule
  ],
  declarations: [GoogleMapPage, ModalComponent],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]
})
export class GoogleMapPageModule {}
