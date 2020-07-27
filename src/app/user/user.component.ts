import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from './user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

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
        });
        console.log('test-4')


      } else {
        console.log('test-3');
        this.loginForm = this.formBuilder.group({
          'userEmail': this.formBuilder.control(null, [
            Validators.required,
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
          ]),
          'userPassword': [null, Validators.required]
        })
      }
    });
  }

  onSubmitSignup() {
    this.userService.createUser(this.signupForm.value.signupEmail, this.signupForm.value.signupPassword );
  }

  onSubmitLogin() {
    this.userService.loginUser(this.loginForm.value.loginEmail, this.loginForm.value.loginPassword );
  }

}
