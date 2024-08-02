import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./footer/footer.module').then( m => m.FooterPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'photo-gallery',
    loadChildren: () => import('./photo-gallery/photo-gallery.module').then( m => m.PhotoGalleryPageModule)
  },
  {
    path: 'whats-app',
    loadChildren: () => import('./whats-app/whats-app.module').then( m => m.WhatsAppPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },  {
    path: 'social-sharing',
    loadChildren: () => import('./social-sharing/social-sharing.module').then( m => m.SocialSharingPageModule)
  },


  // {
  //   path: 'navigation',
  //   loadChildren: () => import('./navigation/navigation.module').then( m => m.NavigationPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
