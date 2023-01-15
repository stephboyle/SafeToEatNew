import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../web.service';
import { AuthService } from '@auth0/auth0-angular';
import { AlertController } from 'ionic-angular'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  reviewForm: any;

  constructor(public webService: WebService,
              public route: ActivatedRoute,
              public router: Router,
              public formBuilder: FormBuilder,
              public http:HttpClient,
              public authService: AuthService) { }

  ngOnInit() {

    this.reviewForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      });

  }

  // login() {
  //   console.log(this.reviewForm.value)
  //   this.webService.login(this.reviewForm)
  //       .subscribe((response: any) => {
  //       this.reviewForm.reset();
  //       this.router.navigate(['/scan']);
  //       // this.users = this.webService.getUser(
  //       //     this.route.snapshot.params['_id']);
  //       }); 

  //       //redirect to login screen 
  //   }
    login() {
      this.auth.login(this.reviewForm).subscribe( async res => {
        if (res) {
          this.router.navigate(['/scan']);
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Login Failed',
            message: 'Wrong Credentials',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
    }

}
