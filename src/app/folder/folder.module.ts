import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FolderPageRoutingModule } from './folder-routing.module';
import { FolderPage } from './folder.page';
import { FooterPage } from '../footer/footer.page';
import { ModalPage } from './modal/modal.page';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    CalendarModule,
    ButtonModule
  ],
  declarations: [FolderPage, FooterPage, ModalPage]
})
export class FolderPageModule {}
