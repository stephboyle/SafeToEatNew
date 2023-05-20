import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { WebService } from '../web.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular'; 
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  scannedData: any;
  productForm: any;
  product: any;

  constructor(public webService: WebService,
              public router: Router,
              public route: ActivatedRoute,
              private barcodeScanner : BarcodeScanner,
              public http: HttpClient,
              public alertCtrl: AlertController,
              public formBuilder: FormBuilder) { }

  ngOnInit() {

    this.productForm = this.formBuilder.group({
      barcode: ['', Validators.required]
      });

  }
  

  deleteAccount(user: any) {
    this.webService.deleteUser(user).subscribe((response:any) => {
              this.router.navigate(['/home'])
                });
  }

  logout(user: any) {
    this.webService.logout(user).subscribe((response:any) => {
              this.router.navigate(['/home'])
                });
  }

  scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedData = barcodeData.text;
      this.webService.getProduct(this.scannedData);
    }).catch(err => {
      console.log('Error', err)
    });
  }


  barcodeDetails() {
    let barcode = this.productForm.get("barcode").value;
    this.webService.getProduct({
      barcode
    }).subscribe( async res => {
      if (res) {
        this.router.navigate(['/product', barcode ]);
      } else {
        const alert = await this.alertCtrl.create({
          header: 'No Barcode Found',
          message: 'Wrong Credentials',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

}
