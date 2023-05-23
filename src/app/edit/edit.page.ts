import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../web.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular'; 
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  accountForm: any;
  user: any;

  constructor(public webService: WebService,
    public router: Router,
    public route: ActivatedRoute,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.accountForm  = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email_address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      allergy: ['', Validators.required],
      username: ['', Validators.required],
    });

    this.webService.getUser(this.user).subscribe(account => {
      this.accountForm.patchValue(account);
    })
  }


  editDetails() {
    if (this.accountForm.valid) {
      const updatedAccount = this.accountForm.value;
      this.webService.editUser(updatedAccount).subscribe(reponse => {
        console.log('Account updated successfully')
      });
    }
  }

  isInvalid(control: any) {
    return this.accountForm.controls[control].invalid &&
    this.accountForm.controls[control].touched;
}

isUntouched() {
    return this.accountForm.controls.first_name.pristine ||
    this.accountForm.controls.last_name.pristine ||
    this.accountForm.controls.email_address.pristine ||
    this.accountForm.controls.username.pristine ||
    this.accountForm.controls.password.pristine ||
    this.accountForm.controls.allergy.pristine;
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
