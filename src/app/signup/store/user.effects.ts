// // user.effects.ts
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, mergeMap, of } from 'rxjs';
// import { UserService } from '../services/user.service';
// import * as UserActions from './user.actions';

// @Injectable()
// export class UserEffects {

//   // Load Users Effect (READ)
//   loadUsers$ = createEffect(() => this.actions$.pipe(
//     ofType(UserActions.loadUsers),
//     mergeMap(() => this.userService.getUsers() // API call
//       .pipe(
//         map(users => UserActions.loadUsersSuccess({ users })), // Dispatch success action
//         catchError(() => of(UserActions.loadUsersFailure())) // Handle error
//       ))
//     )
//   );

//   // Add User Effect (CREATE)
//   addUser$ = createEffect(() => this.actions$.pipe(
//     ofType(UserActions.addUser),
//     mergeMap(({ user }) => this.userService.addUser(user)
//       .pipe(
//         map(newUser => UserActions.addUserSuccess({ user: newUser })),
//         catchError(() => of(UserActions.addUserFailure()))
//       ))
//   ));

//   constructor(
//     private actions$: Actions,
//     private userService: UserService
//   ) {}
// }
