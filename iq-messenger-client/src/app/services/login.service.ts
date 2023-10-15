import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { RequestService } from './request.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootStoreModule } from '../store/root-store.module';
import { RootStoreState } from '../store';
import { UserStoreActions } from '../store/user-store/actions';

const userInCache = 'user';

@Injectable({ providedIn: 'root' })
export class LoginService {
  userSubj = new BehaviorSubject<User | null>(null);

  get userValue(): User | null {
    return this.userSubj.value;
  }

  constructor(
    private request: RequestService,
    private router: Router,
    private store$: Store<RootStoreState.State>
  ) {
    const user = localStorage.getItem(userInCache);

    if (user) {
      const userObj = { username: user } as User;

      this.userSubj.next(userObj);
      this.store$.dispatch(
        UserStoreActions.setCurrentUser({ currentUser: userObj.username })
      );
    }
  }

  login(username: string, password: string) {
    return this.request.login(username, password).pipe(
      map((user) => {
        let userObj = null;

        if (typeof user === 'object' && user.username) {
          this.userSubj.next(user);
          localStorage.setItem(userInCache, user.username);
          userObj = { username: user.username };
        }

        this.store$.dispatch(
          UserStoreActions.setCurrentUser({
            currentUser: userObj?.username || null,
          })
        );

        return userObj;
      })
    );
  }

  logout() {
    this.userSubj.next(null);
    localStorage.removeItem(userInCache);
    this.router.navigate(['/login']);
  }

  register(username: string, password: string) {
    this.request.register(username, password).subscribe((user) => {
      if (typeof user === 'object' && user.username) {
        console.log('User successfully registered', user);
      }
    });
  }
}
