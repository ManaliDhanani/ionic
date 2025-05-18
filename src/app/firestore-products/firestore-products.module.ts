import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirestoreProductsPageRoutingModule } from './firestore-products-routing.module';

import { FirestoreProductsPage } from './firestore-products.page';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirestoreProductsPageRoutingModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ButtonModule,
    DialogModule,
    FileUploadModule,
    PaginatorModule,
    ReactiveFormsModule
  ],
  declarations: [FirestoreProductsPage, ProductListComponent, ProductFormComponent]
})
export class FirestoreProductsPageModule {}
