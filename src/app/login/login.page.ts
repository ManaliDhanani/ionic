import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { range } from 'rxjs';
import { ToastService } from '../services/toastr.service';

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
    private toastrService: ToastService
  ) { }

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
  
  togglePasswordVisibility(input: any){
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  onFormSubmit(){
    
    this.submitted = true;
    if(this.loginForm.invalid) return;
    this.isLoading = true;
    this.http.post('http://192.168.1.25:8010/Api/PDMS/Login', this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        if(res?.Token){
          this.router.navigate(['/home']);
          this.toastrService.successToast(res?.Message); 
          this.loginForm.reset();
          this.submitted = false;
          this.isLoading = false;
        }
      },
      error: (error: any) => {
        this.toastrService.errorToast(error?.error?.Message);
        this.isLoading = false;
      }
    })
  }


}
