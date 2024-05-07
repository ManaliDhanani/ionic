import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../services/toastr.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastrService: ToastService,
    public loadingCtrl: LoadingController
  ) {}

  handleRefresh(event) {
    setTimeout(() => {
      location.reload();
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
   this.LoginForm();
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


}
