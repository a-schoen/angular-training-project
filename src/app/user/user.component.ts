import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from './user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  loginForm: FormGroup;
  subscription: Subscription;
  isSignup: boolean = false;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      
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
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmitSignup(): void {
    this.userService.createUser(this.signupForm.value.signupEmail, this.signupForm.value.signupPassword);
  }

  onSubmitLogin(): void {
    this.userService.loginUser(this.loginForm.value.loginEmail, this.loginForm.value.loginPassword);
  }

}
