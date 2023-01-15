import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  reviewForm: any;
  users: any = [];

  constructor(public webService: WebService,
              public route: ActivatedRoute,
              public router: Router,
              public formBuilder: FormBuilder,
              public http:HttpClient) { }

  ngOnInit() {

    this.reviewForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email_address: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      allergy: ['', Validators.required],
  });

  }

  createAccount() {
    console.log(this.reviewForm.value)
    this.webService.addUser(this.reviewForm.value)
        .subscribe((response: any) => {
        this.reviewForm.reset();
        this.router.navigate(['/login']);
        // this.users = this.webService.getUser(
        //     this.route.snapshot.params['_id']);
        }); 

        //redirect to login screen 
    }


  isInvalid(control: any) {
      return this.reviewForm.controls[control].invalid &&
      this.reviewForm.controls[control].touched;
  }

  isUntouched() {
      return this.reviewForm.controls.first_name.pristine ||
      this.reviewForm.controls.last_name.pristine ||
      this.reviewForm.controls.email_address.pristine ||
      this.reviewForm.controls.username.pristine ||
      this.reviewForm.controls.password.pristine ||
      this.reviewForm.controls.allergy.pristine;
  }
  isIncomplete() {
      return this.isInvalid('first_name') ||
          this.isInvalid('last_name') ||
          this.isInvalid('email_address') ||
          this.isInvalid('username') ||
          this.isInvalid('password') ||
          this.isInvalid('allergy') ||
          this.isUntouched();
  }
}
