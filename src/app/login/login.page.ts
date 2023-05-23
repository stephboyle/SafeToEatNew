import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../web.service';
// import { AuthService } from '@auth0/auth0-angular';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: any;

  constructor(public webService: WebService,
              public route: ActivatedRoute,
              public router: Router,
              public formBuilder: FormBuilder,
              public http:HttpClient,
              // public authService: AuthService,
              public alertCtrl: AlertController) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      });

  }

  // login() {
  //   console.log(this.loginForm.value)
  //   this.webService.login(this.loginForm.value)
  //       .subscribe((response: any) => {
  //       this.loginForm.reset();
  //       this.router.navigate(['/scan']);
  //       // this.users = this.webService.getUser(
  //       //     this.route.snapshot.params['_id']);
  //       }); 

  //       //redirect to login screen 
  //   }
    // login() {
    //   this.authService.login(this.reviewForm).subscribe( async res => {
    //     if (res) {
    //       this.router.navigate(['/scan']);
    //     } else {
    //       const alert = await this.alertCtrl.create({
    //         header: 'Login Failed',
    //         message: 'Wrong Credentials',
    //         buttons: ['OK']
    //       });
    //       await alert.present();
    //     }
    //   });
    // }
    login() {
      const username = this.loginForm.get("username").value;
      this.webService.login({
        username: username,
        password: this.loginForm.get("password").value
      }).subscribe( async res => {
        if (res) {
          this.webService.setVerifiedUsername(username);
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

    isInvalid(control: any) {
      return this.loginForm.controls[control].invalid &&
      this.loginForm.controls[control].touched;
  }

  isUntouched() {
      return this.loginForm.controls.username.pristine ||
            this.loginForm.controls.password.pristine
  }
  isIncomplete() {
      return this.isInvalid('username') ||
          this.isInvalid('password') ||
          this.isUntouched();
  }

}
