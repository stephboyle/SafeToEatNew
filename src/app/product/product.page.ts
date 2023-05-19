import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../web.service';
// import { AuthService } from '@auth0/auth0-angular';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  productList: any;

  constructor(public webService: WebService,
              public route: ActivatedRoute,
              public router: Router,
              public formBuilder: FormBuilder,
              public http:HttpClient,
              // public authService: AuthService,
              public alertCtrl: AlertController) { }

  ngOnInit() {

    this.productList = this.webService.getProduct(this.route.snapshot.params['barcode']);
  }

}
