import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../services/toastr.service';
import { LoadingController, Platform } from '@ionic/angular';
import { FacebookAuthProvider, signInWithPopup, getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';
import { AnalyticsService } from '../services/analytics.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { LiveUpdate } from '@capawesome/capacitor-live-update';

declare var gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  auth = getAuth(); 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastrService: ToastService,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public analyticsService: AnalyticsService,
    // public googlePlus: GooglePlusOriginal
  ) {
    // this.sync();
  }

  async sync() {
  // const current = await LiveUpdate.getCurrentBundle();
  const result = await LiveUpdate.sync({ channel: 'development' });

  // console.log('Current Bundle ID:', current.bundleId);
  console.log('result:', result);
  console.log('Next Bundle ID:', result?.nextBundleId);

  if (result?.nextBundleId) {
    await LiveUpdate.reload();
  }
}

  handleRefresh(event) {
    setTimeout(() => {
      location.reload();
      event.target.complete();
    }, 2000);
  }

  async ngOnInit() {
    this.sync();
   this.LoginForm();
   this.initializeApp();
   await FirebaseAuthentication.signOut();

  //  gapi.load('auth2', () => {
  //   this.initializeGoogleAuth();
  // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      GoogleAuth.initialize();
    })
  }

  pinFormatter(value: number) {
    console.log(value);
    return `${value}%`;
  }

  LoginForm(){
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
    });
  }
  
  // togglePasswordVisibility(input: any){
  //   input.type = input.type === 'password' ? 'text' : 'password';
  // }

  async onFormSubmit(){

    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.submitted = true;
    if(this.loginForm.invalid){ 
      loading.dismiss();
      return;
    }
    loading.dismiss();
    this.loginForm.reset();
    this.submitted = false;
    this.analyticsService.logEvent('login', { method: 'email' });
    this.router.navigate(['/home']);
    this.toastrService.successToast("login successfully"); 

    // this.isLoading = true;
    // this.http.post('http://192.168.1.25:8010/Api/PDMS/Login', this.loginForm.value).subscribe({
    //   next: (res: any) => {
    //     console.log(res);
    //     if(res?.Token){
    //       this.router.navigate(['/home']);
    //       this.toastrService.successToast(res?.Message); 
    //       this.loginForm.reset();
    //       this.submitted = false;
    //       this.isLoading = false;
    //     }
    //   },
    //   error: (error: any) => {
    //     this.toastrService.errorToast(error?.error?.Message);
    //     this.isLoading = false;
    //   }
    // })
  }

  async signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    
    if(this.platform.is('hybrid')){
      // try {
      //   console.log("Calling FirebaseAuthentication.signInWithFacebook()");
      //   const result = await FirebaseAuthentication.signInWithFacebook();
      //   console.log('result: ', result);
      //   const user = result.user;
      //   console.log('user: ', user);
      //   this.router.navigate(['/home']);
      //   this.toastrService.successToast('Logged in with Facebook!');
      // } catch (error) {
        //   console.error('Error signing in with Facebook: ', error);
        //   this.toastrService.errorToast('Error signing in with Facebook.');
        // }
        try {
        console.log('Sign in with Facebook initiated');
        const FACEBOOK_PERMISSIONS = ['email', 'user_birthday', 'user_photos', 'user_gender'];
        const result: FacebookLoginResponse = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
        // const credential = FacebookAuthProvider.credential(result.accessToken.token);
        if (result.accessToken) {
          this.router.navigate(['/home']);
          this.toastrService.successToast('Logged in with Facebook!');
        } else {
          // Cancelled by user.
        }
        // const auth = getAuth();
        // signInWithCredential(auth, credential).then(res => {
        //   console.log(res);
        //   this.router.navigate(['/home']);
        //   this.toastrService.successToast('Logged in with Facebook!');
        // })
      } catch (error) {
        console.error('Error signing in with Facebook: ', error);
        this.toastrService.errorToast('Error signing in with Facebook.');
      }
    }
    else{
      try {
        const result = await signInWithPopup(this.auth, provider);
        console.log('result: ', result);
        const user = result.user;
        console.log('user: ', user);
        this.router.navigate(['/home']);
        this.toastrService.successToast('Logged in with Facebook!');
      } catch (error) {
        console.error('Error signing in with Facebook: ', error);
        this.toastrService.errorToast('Error signing in with Facebook.');
      }
    }
  }

  async signInWithGoogle(){
    // try {
    //   const result = await GoogleAuth.signIn();
    //   console.log('result: ', result);
    //   const auth = getAuth();
    //   const credential = GoogleAuthProvider.credential(result.authentication.idToken);
    //   console.log('credential: ', credential);
    //   await signInWithCredential(auth, credential);
    //   this.router.navigate(['/home']);
    //   this.toastrService.successToast('Logged in with google!');
    // } catch (error) {
    //   console.error('Error signing in with Google: ', error);
    //   this.toastrService.errorToast(error);
    // }

    try {
      if(this.platform.is('hybrid')){
        await FirebaseAuthentication.signInWithGoogle();
        this.router.navigate(['/home']);
        this.toastrService.successToast('Logged in with Google!');
      } else {
        const authInstance = gapi.auth2.getAuthInstance();
        console.log('authInstance: ', authInstance);
        const user = await authInstance.signIn();
        console.log('user: ', user);
        const id_token = user.getAuthResponse().id_token;
        await this.authenticateWithFirebase(id_token);
      }
    }
    catch (error) {
      if(error.error != "popup_closed_by_user"){
        console.error('Error signing in with Google: ', error);
        this.toastrService.errorToast('Error signing in with Google.');
      }
    }
    // const result = await FirebaseAuthentication.signInWithGoogle();
    // console.log('result: ', result.credential.idToken);
    // const auth = getAuth();
    // const credential = GoogleAuthProvider.credential(result.credential.idToken);
    // console.log('credential: ', credential);
    // await signInWithCredential(auth, credential);
  }

  authenticateWithFirebase(id_token: string) {
    const credential = GoogleAuthProvider.credential(id_token);
    signInWithCredential(this.auth, credential).then((result) => {
      console.log("User signed in:", result.user);
      this.router.navigate(['/home']);
      this.toastrService.successToast('Logged in with Google!');
    }).catch((error) => {
      console.error("Error during sign-in:", error);
    });
  }

  // initializeGoogleAuth() {
  //   if (gapi.auth2 && gapi.auth2.getAuthInstance()) {
  //     // Get the existing instance if it's already initialized
  //     return gapi.auth2.getAuthInstance();
  //   } else {
  //     // Initialize it for the first time
  //     return gapi.auth2.init({
  //       client_id: '149263745013-sm102vf9deuj39gmiateq175u85t5pv7.apps.googleusercontent.com',
  //       scope: 'profile email'
  //     });
  //   }
  // }

  async signOutFromGoogle() {
    try {
      await GoogleAuth.signOut();
      const auth = getAuth();
      await auth.signOut();
      this.router.navigate(['/login']);
      this.toastrService.successToast('Signed out successfully!');
    } catch (error) {
      console.error('Error signing out on hybrid platform: ', error);
      this.toastrService.errorToast('Error signing out.');
    }
  }
}
