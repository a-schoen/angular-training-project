import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { loginUserRequest, createUserRequest, authError } from './store/user.actions';
import { UserStatus } from './user.status.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  loginForm: FormGroup;
  routeSubscription: Subscription;
  loginStatusSubscription: Subscription;
  isSignup: boolean = false;
  isLoggedIn: boolean;
  errorMsg: string = '';
  loginStatus$: Observable<UserStatus> = this.store.select(state => state.loginStatus);

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.loadRouteContent();
  }

  ngOnDestroy(): void {
    this.loginStatusSubscription.unsubscribe()
    this.routeSubscription.unsubscribe();
  }

  checkLoginStatus(): void {
    this.loginStatusSubscription = this.loginStatus$.subscribe(
      loginStatus => { 
        this.isLoggedIn = loginStatus.userLoggedIn;
        this.errorMsg = loginStatus.loginErrorMsg;
      },
      err => { console.error(err) }
    );
  }

  loadRouteContent(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(
      params => {
        this.store.dispatch(authError({userLoggedIn: this.isLoggedIn, loginErrorMsg: '' }));
        if(params['type'] === 'signup') {
          this.isSignup = true;
          this.signupForm = this.formBuilder.group({
          'signupEmail': this.formBuilder.control(null, [
            Validators.required,
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
          ]),
          'signupPassword': [null, Validators.required],
          'repeatPassword': [null, Validators.required]
          })
        } else {
          this.loginForm = this.formBuilder.group({
            'loginEmail': this.formBuilder.control(null, [
              Validators.required,
              Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            'loginPassword': [null, Validators.required]
          })
        }
      }
    );
  }

  onSubmitSignup(): void {
    this.store.dispatch(createUserRequest({ userEmail: this.signupForm.value.signupEmail, userPassword: this.signupForm.value.signupPassword }))
  }

  onSubmitLogin(): void {
    this.store.dispatch(loginUserRequest({userEmail: this.loginForm.value.loginEmail, userPassword: this.loginForm.value.loginPassword}));
  }

}
