import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../services/toastr.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastrService: ToastService,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.SignupForm();
  }

  SignupForm(){
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]]
    })
  }

  async onFormSubmit(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.submitted = true;
    if(this.signupForm.invalid){
      loading.dismiss();
      return;
    }
    loading.dismiss();
    this.signupForm.reset();
    this.submitted = true;
    this.router.navigate(['/login']);
    this.toastrService.successToast("Registration successful");
  }

}
