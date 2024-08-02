import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatsAppPage } from './whats-app.page';

const routes: Routes = [
  {
    path: '',
    component: WhatsAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatsAppPageRoutingModule {}
