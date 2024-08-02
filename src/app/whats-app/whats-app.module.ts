import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatsAppPageRoutingModule } from './whats-app-routing.module';

import { WhatsAppPage } from './whats-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatsAppPageRoutingModule
  ],
  declarations: [WhatsAppPage]
})
export class WhatsAppPageModule {}
