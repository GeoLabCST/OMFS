import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public usrData: object;

  constructor(
    public navCtrl: NavController,
    //public navParams: NavParams
    public service: ServiceProvider
  ) {
    this.usrData = this.service.getUserData();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfilePage');
  }

}
