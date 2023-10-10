import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { RequestService } from './request.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {
  userSubj = new BehaviorSubject<User | null>(null);

  get userValue(): User | null {
    return this.userSubj.value;
  }

  constructor(private request: RequestService, private router: Router) {}

  login(username: string, password: string) {
    return this.request.login(username, password).pipe(
      map((user) => {
        if (typeof user === 'object' && user.username) {
          this.userSubj.next(user);
          return { username: user.username };
        }

        return null;
      })
    );
  }

  logout() {
    this.userSubj.next(null);
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
