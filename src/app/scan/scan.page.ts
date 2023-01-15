import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  constructor(public webService: WebService,
              public router: Router) { }

  ngOnInit() {
  }

  deleteAccount(user: any) {
    this.webService.deleteUser(user).subscribe((response:any) => {
              this.router.navigate(['/home'])
                });
  }


}
