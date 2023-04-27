import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { WebService } from '../web.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  scannedData: any;

  constructor(public webService: WebService,
              public router: Router,
              private barcodeScanner : BarcodeScanner,
              public http: HttpClient) { }

  ngOnInit() {
  }

  deleteAccount(user: any) {
    this.webService.deleteUser(user).subscribe((response:any) => {
              this.router.navigate(['/home'])
                });
  }

  // scanBarcode() {
  //   this.barcodeScanner.scan().then(barcodeData => {
  //     console.log('Barcode data', barcodeData);
  //   }).catch(err => {
  //     console.log('Error', err);
  //   })
  // }

  scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedData = barcodeData.text;
      this.webService.getProduct(this.scannedData);
    }).catch(err => {
      console.log('Error', err)
    });
  }


  // getProduct() {
  //   this.http.get<any>()
  // }


}
