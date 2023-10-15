import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginService } from 'src/app/services/login.service';
import { RootStoreState } from 'src/app/store';
import { selectCurrentUserName } from 'src/app/store/user-store/selectors';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  username$ = this.store$.select(selectCurrentUserName);

  constructor(
    private store$: Store<RootStoreState.State>,
    private loginService: LoginService
  ) {}

  logout() {
    this.loginService.logout();
  }
}
