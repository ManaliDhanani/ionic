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
  ) {}

  handleRefresh(event) {
    setTimeout(() => {
      location.reload();
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
   this.LoginForm();
   this.initializeApp();
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

    // const FACEBOOK_PERMISSIONS = ['email', 'public_profile'];
    // const result: FacebookLoginResponse = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });

    // if (result.accessToken) {
    //   // Use the access token to sign in with your backend or use the user info
    //   console.log('User signed in with Facebook', result.accessToken);
    //   console.log('User data:', result);
    // } else {
    //   // Handle errors or user cancellation
    //   console.log('User cancelled login or there was an error');
    // }

    const provider = new FacebookAuthProvider();
    console.log('Sign in with Facebook initiated');

    if(this.platform.is('hybrid')){
      try {
        console.log("Calling FirebaseAuthentication.signInWithFacebook()");
        const result = await FirebaseAuthentication.signInWithFacebook();
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

        // if (this.platform.is('hybrid')) {
    //   try {
    //     await signInWithRedirect(this.auth, provider);
    //     this.router.navigate(['/home']);
    //     this.toastrService.successToast('Logged in with Facebook!');
    //   } catch (error) {
    //     console.error('Error signing in with Facebook: ', error);
    //     this.toastrService.errorToast('Error signing in with Facebook.');
    //   }
    // }
  }

  async signInWithGoogle(){
    if(this.platform.is('hybrid')){
      try {
        const result = await GoogleAuth.signIn();
        console.log('result: ', result);
        const auth = getAuth();
        const credential = GoogleAuthProvider.credential(result.authentication.idToken);
        console.log('credential: ', credential);
        await signInWithCredential(auth, credential);
        this.router.navigate(['/home']);
        this.toastrService.successToast('Logged in with google!');
      } catch (error) {
        console.error('Error signing in with Google: ', error);
        this.toastrService.errorToast(error);
      }
    } else {
      try{
        const provider = new GoogleAuthProvider();
        console.log('Sign in with google initiated');
  
        const result = await signInWithPopup(this.auth, provider);
        const user = result.user;
        console.log('user: ', user);
        this.router.navigate(['/home']);
        this.toastrService.successToast('Logged in with Google!');
      } catch (error) {
        console.error('Error signing in with Google: ', error);
        this.toastrService.errorToast('Error signing in with Google.');
      }
    }
  }

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
