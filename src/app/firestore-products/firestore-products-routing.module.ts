import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirestoreProductsPage } from './firestore-products.page';

const routes: Routes = [
  {
    path: '',
    component: FirestoreProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirestoreProductsPageRoutingModule {}
