import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Storage } from '@ionic/storage';
import { WelcomePage } from '../welcome/welcome';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public usrData: any;

  constructor(
    public navCtrl: NavController,
    //public navParams: NavParams
    public service: ServiceProvider,
    private storage: Storage,
    private app: App

  ) {
    this.usrData = this.service.getUserData();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfilePage');
  }

  logOut() {
    this.storage.remove('user')
    const nav = this.app.getRootNav();
    nav.setRoot(WelcomePage);
  }

}
