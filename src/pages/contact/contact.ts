import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public report : any; 

  constructor(
  	public navCtrl: NavController,
    public http: HttpClient,
  ) {  	
  }

  ionViewWillEnter(){
    this.initializePro();
  }

  reload(){
    this.initializePro();
  }


  initializePro() {
    this.http.get('http://119.59.125.191/service/service_fire_report.php')
    .subscribe(res => {
      this.report = res;
      //console.log(res);
    }, error => {
      console.log("Oooops!");
    });
  }

  doRefresh(refresher) {
    //console.log('Begin async operation', refresher);
    this.initializePro();
    setTimeout(() => {
      //console.log('Async operation has ended');
      refresher.complete();
    }, 500);
  }

}
