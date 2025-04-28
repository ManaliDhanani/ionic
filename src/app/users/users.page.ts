import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUsers } from '../signup/store/user.selectors';
import { User } from '../signup/interface/user';
import { deleteUser } from '../signup/store/user.actions';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: User[] = [];
  userRes: User[] = [];
  searchTerm: string = '';

  constructor(
    private store: Store,
    private router: Router,
    private alertController: AlertController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.store.select(selectUsers).subscribe((users) => {
      this.users = this.filterUsers(users, this.searchTerm);
      console.log('this.users: ', this.users);
    });
    this.http.get('https://angularhttpclient-d6c80-default-rtdb.firebaseio.com/users.json')
    .subscribe(res => console.log("firebase-res:", Object.entries(res)));
  }

  async openAlert(userId: number) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.deleteUser(userId);
          }
        },
      ]
    });
    await alert.present();
  }

  deleteUser(userId: number) {
    this.store.dispatch(deleteUser({ userId }));
  }

  updateUser(user: User) {
    this.router.navigate(['/signup'], { queryParams: { userId: user.id } });
  }

  addUser() {
    this.router.navigate(['/signup']);
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.store.select(selectUsers).subscribe((users) => {
      this.users = this.filterUsers(users, this.searchTerm);
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.store.select(selectUsers).subscribe((users) => {
      this.users = this.filterUsers(users, this.searchTerm);
    });
  }

  filterUsers(users: User[], searchTerm: string) {
    if (!searchTerm) {
      return users;
    }
    return users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    );
  }
}
