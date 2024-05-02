import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { range } from 'rxjs';

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
    private router: Router
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  
  togglePasswordVisibility(input: any){
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  onFormSubmit(){
    
    this.submitted = true;
    if(this.loginForm.invalid) return;
    this.isLoading = true;
    this.router.navigate(['/home']);
    this.loginForm.reset();
    this.submitted = false;
    this.isLoading = false;
  }


}
