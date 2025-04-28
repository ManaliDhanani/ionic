import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toastr.service';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { addUser, updateUser } from './store/user.actions';
import { User } from './interface/user';
import { of, switchMap } from 'rxjs';
import { selectUsers } from './store/user.selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  userId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastrService: ToastService,
    public loadingCtrl: LoadingController,
    private store: Store,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.SignupForm();

    this.route.queryParams
    .pipe(
      switchMap(params => {
        this.userId = params['userId'] ? +params['userId'] : null;
        if (this.userId) {
          return this.store.select(selectUsers).pipe(
            switchMap(users => of(users.find(user => user.id === this.userId)))
          );
        }
        return of(null);
      })
    )
    .subscribe(user => {
      if (user) {
        this.signupForm.patchValue(user);
      }
    });
  }

  SignupForm(){
    this.signupForm = this.formBuilder.group({
      id: [null],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("[0-9]{10}")]]
    });
  }

  async onFormSubmit(){
    if(this.signupForm.invalid) return;
    if(this.userId){
      this.store.dispatch(updateUser({ user: { ...this.signupForm.value, id: this.userId }}));
      this.toastrService.successToast("User updated successfully!");
    } else {
      this.store.dispatch(addUser({ user: this.signupForm.value }));
      this.toastrService.successToast("User registered successfully!");
    }

    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.signupForm.reset();
    this.submitted = true;
    loading.dismiss();
    this.router.navigate(['/users']);
  }

}
