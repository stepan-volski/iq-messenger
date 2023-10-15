import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { RequestService } from 'src/app/services/request.service';
import { State } from 'src/app/store/state';
import { UserStoreActions } from 'src/app/store/user-store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;

  private get controls() {
    return this.loginForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) {
    if (loginService.userValue?.username) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService
      .login(this.controls['username'].value, this.controls['password'].value)
      .pipe(first())
      .subscribe((user) => {
        if (!user) {
          return;
        }

        this.router.navigate(['/']);
      });
  }

  register() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.register(
      this.controls['username'].value,
      this.controls['password'].value
    );
  }
}
