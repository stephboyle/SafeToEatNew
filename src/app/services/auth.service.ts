import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class AuthServicee implements OnInit {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  ngOnInit() {
  }

}
